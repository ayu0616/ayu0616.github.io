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
      image = local.image_name
      resources {
        cpu_idle          = true
        startup_cpu_boost = true
      }
      ports {
        container_port = 3000
      }
      volume_mounts {
        mount_path = "/app/blog-contents"
        name       = "blog-contents"
      }
    }

    volumes {
      name = "blog-contents"
      gcs {
        bucket = var.bucket_name
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
