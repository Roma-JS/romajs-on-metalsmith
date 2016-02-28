require('harmonize')();

var socials = {
  'facebook-square': 'https://www.facebook.com/romajs.org',
  'twitter-square': 'https://twitter.com/roma_js',
  'youtube-square': 'https://www.youtube.com/channel/UCFm8OPi5USbFybw9SaTLxeA',
  'slack': 'https://romajs.herokuapp.com/',
  'github': 'https://github.com/Roma-JS',
  'google-plus-square': 'https://plus.google.com/communities/114324393897443067092',
  'meetup': 'http://www.meetup.com/RomaJS/'
};

var Metalsmith  = require('metalsmith'),
  sass          = require('metalsmith-sass'),
  serve         = require('metalsmith-serve'),
  assets        = require('metalsmith-assets'),
  layouts       = require('metalsmith-layouts'),
  inPlace       = require('metalsmith-in-place'),
  markdown      = require('metalsmith-markdown'),
  permalinks    = require('metalsmith-permalinks'),
  collections   = require('metalsmith-collections');

var m = Metalsmith(__dirname)
  .use(collections({
    posts: {
      pattern: 'content/posts/*.md'
    },
    pages: {
      pattern: 'content/pages/*.md'
    }
  }))
  .use(markdown())
  .use(permalinks({
    pattern: ':title',
    linksets: [{
      match: {collection: 'posts'},
      pattern: 'blog/:date/:title'
    }]
  }))
  .use(function(files, metalsmith, done) {
    var meta = metalsmith.metadata();
    meta.socials = socials;
    done();
  })
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
  }))
  .use(inPlace({
    engine: 'handlebars'
  }))
  .use(assets({
    source: 'src/assets', // relative to the working directory
    destination: './assets' // relative to the build directory
  }))
  .use(assets({
    source: 'node_modules/font-awesome/fonts',
    destination: './assets/fonts'
  }))
  // Process css
  .use(sass({
    sourceMap: true,
    sourceMapContents: true
  }))
  .destination('./build');

if (process.argv[2] === '--serve') {
  m.use(serve({}));
}

m.build(function (err) {
  if (err) {
    console.error(err);
  }
});
