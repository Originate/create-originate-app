#!/usr/bin/env sh

set -euo pipefail

function main {
    local repo="git@github.com:Originate/create-originate-app.git"
    local name=$1
    if [[ -d "$name" ]]; then
        echo "error: $name already exists" 1>&2
        exit 1
    fi
    git init "$name"
    cd "$name"
    git clone "$repo" vendor
    ./vendor/bootstrap
}

if (( $# < 1 )); then
    echo "error: npx create-originate-app [name of app]" 1>&2
    exit 1
fi

main "$1"
