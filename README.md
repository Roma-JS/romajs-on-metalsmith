# Romajs group website generator

[![Build Status](https://travis-ci.org/Roma-JS/romajs-on-metalsmith.svg?branch=master)](https://travis-ci.org/Roma-JS/romajs-on-metalsmith)

*REQUIRES NODE >=0.12*

# How to add content

1. clone the repo
2. `npm install`
3. `npm run dev`
4. add stuff

The project is based on the [metalsmith framework](https://github.com/segmentio/metalsmith).

# How the generation works

Every time there is a commit/PR in the master branch the build process starts here: [https://travis-ci.org/Roma-JS/romajs-on-metalsmith](https://travis-ci.org/Roma-JS/romajs-on-metalsmith)

Travis reads the instruction to build the project from the `.travis.yml` file in the project and uses a github token [https://github.com/settings/tokens](https://github.com/settings/tokens) generated using the `LucaLanziani`'s account and integrated with the travis process using the steps on the following guide: https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
