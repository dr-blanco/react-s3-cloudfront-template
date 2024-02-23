provider "aws" {
  region = "us-east-1"
}

variable "domain_name" {
  description = "The domain name for the website"
  type        = string
}

variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
}

data "aws_route53_zone" "primary" {
  name         = var.domain_name
  private_zone = false
}

# Retrieve the ACM certificate based on the domain name
data "aws_acm_certificate" "cert" {
  domain   = var.domain_name
  statuses = ["ISSUED"]
  most_recent = true
}

# S3 Bucket for website hosting
resource "aws_s3_bucket" "website_bucket" {
  bucket = var.bucket_name
}

# S3 Bucket website configuration
resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# CloudFront Origin Access Control
resource "aws_cloudfront_origin_access_control" "example_oac" {
  name                              = "${var.domain_name}-oac"
  description                       = "OAC for ${var.domain_name}"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
  origin_access_control_origin_type = "s3"
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.example_oac.id
    origin_id                = "S3-${aws_s3_bucket.website_bucket.id}"
  }

  enabled = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.website_bucket.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2019"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # Aliases for domain names
  aliases = [var.domain_name, "www.${var.domain_name}"]
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website_bucket.arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = ["${aws_cloudfront_distribution.s3_distribution.arn}"]
    }
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = data.aws_iam_policy_document.s3_policy.json
}


# Route 53 record to point to CloudFront distribution for 'www' subdomain
resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.primary.id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

# Route 53 record to point to CloudFront distribution for apex domain
resource "aws_route53_record" "root" {
  zone_id = data.aws_route53_zone.primary.id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

output "cloudfront_distribution_domain" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}
