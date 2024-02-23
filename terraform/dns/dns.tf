provider "aws" {
  region = "us-east-1"
}

variable "domain_name" {
  description = "The domain name for the website"
  type        = string
}

# Create a hosted zone for the domain
resource "aws_route53_zone" "primary" {
  name = var.domain_name
}

# ACM Certificate for the domain and subdomains
resource "aws_acm_certificate" "cert" {
  domain_name       = var.domain_name
  validation_method = "DNS"

  subject_alternative_names = [
    "www.${var.domain_name}",
    "*.${var.domain_name}"
  ]

  lifecycle {
    create_before_destroy = true
  }
}

# DNS records for the ACM certificate validation
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = aws_route53_zone.primary.zone_id
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 60
}


# Outputs
output "hosted_zone_id" {
  value = aws_route53_zone.primary.zone_id
}

output "hosted_zone_name_servers" {
  value = aws_route53_zone.primary.name_servers
}

output "acm_certificate_arn" {
  value = aws_acm_certificate.cert.arn
}
