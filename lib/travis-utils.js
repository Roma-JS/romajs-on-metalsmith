module.exports.urlPrefix = function () {
  var env = process.env;
  if (env.TRAVIS_BRANCH === 'develop' && env.TRAVIS_REPO_SLUG) {
    var user = env.TRAVIS_REPO_SLUG.split('/')[0];
    var repo = env.TRAVIS_REPO_SLUG.split('/')[1];
    return 'http://' + user + '.github.io/' + repo;
  }

  return '';
};
