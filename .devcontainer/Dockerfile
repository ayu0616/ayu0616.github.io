FROM mcr.microsoft.com/vscode/devcontainers/typescript-node

# install terraform
ARG TERRAFORM_VERSION=1.9.5
RUN apt update -y && \
    wget https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip && \
    unzip terraform_${TERRAFORM_VERSION}_linux_amd64.zip && \
    mv terraform /usr/local/bin/ && \
    rm terraform_${TERRAFORM_VERSION}_linux_amd64.zip
