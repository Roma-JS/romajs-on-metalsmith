var travisUtils = require('./travis-utils');

var socials = {
  'facebook-square': 'https://www.facebook.com/romajs.org',
  'twitter-square': 'https://twitter.com/roma_js',
  'youtube-square': 'https://www.youtube.com/channel/UCFm8OPi5USbFybw9SaTLxeA',
  'slack': 'https://romajs.herokuapp.com/',
  'github': 'https://github.com/Roma-JS',
  'google-plus-square': 'https://plus.google.com/communities/114324393897443067092'
};

function setUrlPrefix(files, metalsmith, done) {
  var meta = metalsmith.metadata();
  meta.urlPrefix = process.env.URL_PREFIX || travisUtils.urlPrefix();

  done();
}

function addSocialsToMetadata(files, metalsmith, done) {
  var meta = metalsmith.metadata();
  meta.socials = socials;
  done();
}

function debug(logToConsole) {
  return function(files, metalsmith, done) {
    if (logToConsole) {
      console.log('\nMETADATA:');
      console.log(metalsmith.metadata());

      for (var f in files) {
        console.log('\nFILE:');
        console.log(files[f]);
      }
    }

    done();
  };
};

module.exports = {
  debug: debug,
  setUrlPrefix: setUrlPrefix,
  addSocialsToMetadata: addSocialsToMetadata
};
