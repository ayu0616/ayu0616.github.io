#! /bin/zsh

zip -r blog-contents.zip blog-contents
gcloud storage cp blog-contents.zip gs://hassaku-blog-contents/blog-contents
rm blog-contents.zip
