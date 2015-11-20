#!/bin/bash
set -e # exit with nonzero exit code if anything fails
set -x

OUTPUTDIR='build'
GITHUB_USERNAME='Travis CI'
GITHUB_EMAIL='luca@lanziani.com'
GITHUB_MESSAGE='Travis deploy'
GITHUB_REF='github.com:Roma-JS/roma-js.github.io.git'


if [[ ${TRAVIS} == true ]]; then 
  # go to the out directory and create a *new* Git repo
  cd ${OUTPUTDIR}
  git init

  # inside this git repo we'll pretend to be a new user
  git config user.name "${GITHUB_USERNAME}"
  git config user.email "${GITHUB_EMAIL}"

  # The first and only commit to this new Git repo contains all the
  # files present with the commit message "Deploy to GitHub Pages".
  git add .
  git commit -m "${GITHUB_MESSAGE}"

  if [[ ${TRAVIS_PULL_REQUEST} == false ]]; then
    # Force push from the current repo's master branch to the remote
    # repo's gh-pages branch. (All previous history on the gh-pages branch
    # will be lost, since we are overwriting it.) We redirect any output to
    # /dev/null to hide any sensitive credential data that might otherwise be exposed.
    git push --force --quiet "https://${GH_TOKEN}@${GITHUB_REF}" master:master > /dev/null 2>&1
  fi
else
  echo "This makes sense only on travis"
fi
