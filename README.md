# React S3 Cloudfront Template

## Env Variables

```
AWS_ACCESS_KEY_ID
AWS_S3_BUCKET
DOMAIN_NAME
AWS_SECRET_ACCESS_KEY
```

## Setup
Run the terraform pipelines manually for setup. First time use **plan** as the pipeline argument, then use **apply**.

1. Run the DNS pipeline first, it will print the name servers that you can input to a third party DNS provider.  
2. Then run the main terraform pipeline, this will create a cloudfront s3 static web page.

You can use the **delete** but it may not work if the bucket is not empty. The solution is to simply delete the resources manually, then run delete again until it works. NOTE that if you delete the metadata file created by terraform, and uploaded to this repo, then the delete command will not work.

