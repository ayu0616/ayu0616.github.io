resource "google_storage_bucket" "static" {
  name                        = var.bucket_name
  location                    = "ASIA"
  storage_class               = "STANDARD"
  uniform_bucket_level_access = true
  force_destroy               = true
}

# resource "google_storage_bucket_object" "defalut" {
#   name   = "/"
#   bucket = google_storage_bucket.static.name
#   source = "../blog-contents"
# }

resource "google_storage_bucket_iam_binding" "public_bucket_iam_binding" {
  bucket = google_storage_bucket.static.name
  role   = "roles/storage.legacyObjectReader"
  members = [
    "allUsers",
  ]
}
