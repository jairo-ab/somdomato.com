#!/usr/bin/env sh

pnpm install
pnpm run build
sudo /usr/bin/systemctl restart nuxt.service