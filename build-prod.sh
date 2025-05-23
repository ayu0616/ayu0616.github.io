#! /bin/sh

cd $(dirname $0)

if [ -f blog-contents.zip ]; then
    rm blog-contents.zip
fi
zip -r blog-contents.zip blog-contents
docker compose -f docker-compose.prod.yml --env-file .env.local build
rm blog-contents.zip
