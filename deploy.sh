#!/usr/bin/env sh

set -e

rm -rf dist

yarn run build

cd dist

echo > .nojekyll

git init
git checkout -B gh-pages
git add -A
git commit -m 'deploy'

git push -f https://github.com/TonicHabbo/hab-tycoon.git gh-pages

cd -
