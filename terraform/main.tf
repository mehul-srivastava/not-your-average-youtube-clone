terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws",
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "eu-north-1"
}

module "temporary_s3" {
  source      = "./modules/s3_bucket"
  bucket_name = "youtube-clone-temporary"
}

module "transcoded_s3" {
  source      = "./modules/s3_bucket"
  bucket_name = "youtube-clone-transcoded"
}

module "cloudfront" {
  source = "./modules/cloudfront"
  bucket_regional_domain_name = module.transcoded_s3.bucket_domain_name
}

# TODO: Plan out VPC settings + setup EC2
