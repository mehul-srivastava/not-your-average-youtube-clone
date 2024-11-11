locals {
  s3_origin_id = "s3-transcoded-origin"
}

variable "bucket_regional_domain_name" {
  description = "The regional domain name of transcoded S3 bucket"
  type        = string
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  is_ipv6_enabled = false
  enabled         = true
  origin {
    domain_name = var.bucket_regional_domain_name
    origin_id   = local.s3_origin_id
  }
  default_cache_behavior {
    cached_methods         = ["GET", "HEAD"]
    allowed_methods        = ["GET", "HEAD"]
    viewer_protocol_policy = "allow-all"
    target_origin_id       = local.s3_origin_id
  }
  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }
  viewer_certificate {}
}
