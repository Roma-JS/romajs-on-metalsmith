var socials = {
  'facebook-square': 'https://www.facebook.com/romajs.org',
  'twitter-square': 'https://twitter.com/roma_js',
  'youtube-square': 'https://www.youtube.com/channel/UCFm8OPi5USbFybw9SaTLxeA',
  'slack': 'https://romajs.herokuapp.com/',
  'github': 'https://github.com/Roma-JS',
  'google-plus-square': 'https://plus.google.com/communities/114324393897443067092'
};

function addSocialsToMetadata(files, metalsmith, done) {
  var meta = metalsmith.metadata();
  meta.socials = socials;
  done();
}

module.exports = {
  addSocialsToMetadata: addSocialsToMetadata
};
