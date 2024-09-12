#! /bin/sh

zip -r blog-contents.zip blog-contents
docker compose -f docker-compose.prod.yml --env-file .env.local build
rm blog-contents.zip
