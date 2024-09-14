resource "google_cloud_run_v2_service" "default" {
  provider = google-beta
  name     = "portfolio-web"
  location = var.region

  deletion_protection = false

  template {
    timeout                          = "300s"
    max_instance_request_concurrency = 50

    containers {
      name  = "portfolio-web"
      image = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.app.repository_id}/portfolio-web:latest"
      resources {
        cpu_idle          = true
        startup_cpu_boost = true
      }
      ports {
        container_port = 3000
      }
    }

    scaling {
      min_instance_count = 0
      max_instance_count = 1
    }
  }

  lifecycle {
    ignore_changes = [
      client,
      client_version,
      template[0].containers[0].image,
    ]
  }

  depends_on = []
}

resource "google_artifact_registry_repository" "app" {
  location      = var.region
  repository_id = "portfolio-web"
  format        = "DOCKER"
}

# 未認証のアクセスを許可する設定
data "google_iam_policy" "noauth" {
  binding {
    role    = "roles/run.invoker"
    members = ["allUsers"]
  }
}
resource "google_cloud_run_v2_service_iam_policy" "noauth" {
  location = google_cloud_run_v2_service.default.location
  project  = google_cloud_run_v2_service.default.project
  name     = google_cloud_run_v2_service.default.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
