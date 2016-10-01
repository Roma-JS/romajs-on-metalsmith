require('harmonize')();

var Metalsmith  = require('metalsmith'),
  sass          = require('metalsmith-sass'),
  serve         = require('metalsmith-serve'),
  assets        = require('metalsmith-assets'),
  layouts       = require('metalsmith-layouts'),
  inPlace       = require('metalsmith-in-place'),
  markdown      = require('metalsmith-markdown'),
  permalinks    = require('metalsmith-permalinks'),
  collections   = require('metalsmith-collections'),
  excerpts      = require('metalsmith-excerpts'),
  pagination    = require('metalsmith-pagination'),
  hbs_helpers   = require('metalsmith-register-helpers'),
  myPlugins     = require('./lib/metalsmith-plugins');

var m = Metalsmith(__dirname)
  .use(hbs_helpers({
    directory: 'hbs_helpers'
  }))
  .use(collections({
    posts: {
      pattern: 'content/posts/*.md'
    },
    pages: {
      pattern: 'content/pages/*.md'
    }
  }))
  .use(markdown({
    "smartypants": true,
    "gfm": true,
    "tables": true
  }))
  .use(excerpts())
  .use(permalinks({
    pattern: ':title',
    linksets: [{
      match: {collection: 'posts'},
      pattern: 'blog/:date/:title'
    }]
  }))
  .use(pagination({
    'collections.posts': {
      perPage: 5,
      layout: 'blog.hbs',
      first: 'blog/index.html',
      path: 'blog/:num/index.html',
      filter: function (page) {
        return !page.private
      },
      pageMetadata: {
        title: 'Blog'
      }
    }
  }))
  .use(myPlugins.addSocialsToMetadata)
  .use(myPlugins.setUrlPrefix)
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
