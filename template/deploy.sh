
# Setup

# You will need the heroku-cli:
# https://devcenter.heroku.com/articles/heroku-cli

HEROKU_FRONTEND_NAME=coa-frontend-test2
HEROKU_BACKEND_NAME=coa-backend-test2

if [ -z ${HEROKU_FRONTEND_NAME+x} ]; then echo "Must HEROKU_FRONTEND_NAME in this script"; fi
if [ -z ${HEROKU_BACKEND_NAME+x} ]; then echo "Must set HEROKU_BACKEND_NAME in this script"; fi

if [[ $* == *--setup* ]]; then
  # Create the heroku applications
  heroku create $HEROKU_FRONTEND_NAME 
  heroku create $HEROKU_BACKEND_NAME 

  # Add the multi-procfile buildpack to each application
  heroku buildpacks:add -a $HEROKU_FRONTEND_NAME heroku-community/multi-procfile
  heroku buildpacks:add -a $HEROKU_BACKEND_NAME heroku-community/multi-procfile

  # Add the node build pack to each application
  heroku buildpacks:add -a $HEROKU_FRONTEND_NAME heroku/nodejs
  heroku buildpacks:add -a $HEROKU_BACKEND_NAME heroku/nodejs

  heroku addons:create -a $HEROKU_BACKEND_NAME heroku-postgresql:hobby-dev

  # Set appropriate procfiles
  heroku config:set -a $HEROKU_FRONTEND_NAME PROCFILE=frontend.Procfile
  heroku config:set -a $HEROKU_BACKEND_NAME PROCFILE=backend.Procfile

  # heroku config:set -a $HEROKU_BACKEND_NAME NODE_MODULE_CACHE=false
  heroku config:set -a $HEROKU_BACKEND_NAME NPM_CONFIG_PRODUCTION=true
  heroku config:set -a $HEROKU_BACKEND_NAME NODE_ENV=production
else
  git push https://git.heroku.com/$HEROKU_FRONTEND_NAME.git HEAD:main
  git push https://git.heroku.com/$HEROKU_BACKEND_NAME.git HEAD:main
fi
