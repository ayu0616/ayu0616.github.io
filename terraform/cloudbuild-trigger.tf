resource "google_cloudbuild_trigger" "default" {
  name = "portfolio-web"

  build {
    step {
      name       = "gcr.io/cloud-builders/docker"
      entrypoint = "bash"
      args = [
        "-c",
        "docker pull ${local.image_name}:latest || exit 0"
      ]
    }

    step {
      name = "gcr.io/cloud-builders/docker"
      args = [
        "buildx",
        "build",
        "-f",
        "Dockerfile.prod",
        "-t",
        local.image_name,
        "--cache-from",
        local.image_name,
        ".",
      ]
      env = [
        "DOCKER_BUILDKIT=1",
      ]
    }
    step {
      name = "gcr.io/cloud-builders/docker"
      args = [
        "push",
        local.image_name,
      ]
    }
    step {
      name = "gcr.io/cloud-builders/gcloud"
      args = [
        "run",
        "deploy",
        "portfolio-web",
        "--image",
        local.image_name,
        "--region",
        var.region,
        "--platform",
        "managed",
        "--allow-unauthenticated",
      ]
    }
    images = [local.image_name]
  }
  github {
    owner = var.github_owner
    name  = var.github_repo
    push {
      branch = "^main$"
    }
  }
}

