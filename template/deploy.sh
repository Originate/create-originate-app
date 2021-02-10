
# Setup

# You will need the heroku-cli:
# https://devcenter.heroku.com/articles/heroku-cli

FRONTEND_NAME=coa-frontend-test
BACKEND_NAME=coa-backend-test

if [[ $* == *--setup* ]]; then
  # Create the heroku applications
  heroku create $FRONTEND_NAME 
  heroku create $BACKEND_NAME 

  # Add the multi-procfile buildpack to each application
  heroku buildpacks:add -a $FRONTEND_NAME heroku-community/multi-procfile
  heroku buildpacks:add -a $BACKEND_NAME heroku-community/multi-procfile

  # Add the node build pack to each application
  heroku buildpacks:add -a $FRONTEND_NAME heroku/nodejs
  heroku buildpacks:add -a $BACKEND_NAME heroku/nodejs

  heroku addons:create -a $BACKEND_NAME heroku-postgresql:hobby-dev

  # Set appropriate procfiles
  heroku config:set -a $FRONTEND_NAME PROCFILE=frontend.Procfile
  heroku config:set -a $BACKEND_NAME PROCFILE=backend.Procfile

  # heroku config:set -a $BACKEND_NAME NODE_MODULE_CACHE=false
  heroku config:set -a $BACKEND_NAME NPM_CONFIG_PRODUCTION=true
  heroku config:set -a $BACKEND_NAME NODE_ENV=production
else
  # git push https://git.heroku.com/$FRONTEND_NAME.git HEAD:main
  git push https://git.heroku.com/$BACKEND_NAME.git HEAD:main
fi
