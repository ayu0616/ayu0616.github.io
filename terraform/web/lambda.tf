provider "aws" {
  region = "ap-northeast-1"
}

resource "aws_ecr_repository" "example_repo" {
  name         = "example-repo"
  force_delete = true
}

data "aws_ecr_authorization_token" "token" {}

resource "null_resource" "image_push" {
  provisioner "local-exec" {
    command = <<-EOF
      DOCKER_IMAGE="${aws_ecr_repository.example_repo.repository_url}:latest" ../../build-prod.sh; \
      docker login -u AWS -p ${data.aws_ecr_authorization_token.token.password} ${data.aws_ecr_authorization_token.token.proxy_endpoint}; \
      docker push ${aws_ecr_repository.example_repo.repository_url}:latest
    EOF
  }
}

resource "aws_lambda_function" "example" {
  function_name = "example-function"
  image_uri     = "${aws_ecr_repository.example_repo.repository_url}:latest"
  package_type  = "Image"
  architectures = ["arm64"]

  role = aws_iam_role.lambda_exec.arn

  environment {
    variables = {
      AWS_LWA_INVOKE_MODE = "response_stream"
    }
  }
}

resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
      },
    ],
  })
}

resource "aws_iam_role_policy_attachment" "lambda_exec_attach" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function_url" "test" {
  function_name      = aws_lambda_function.example.function_name
  authorization_type = "NONE"
  invoke_mode        = "RESPONSE_STREAM"
}
