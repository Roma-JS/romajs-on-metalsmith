require('harmonize')();

var Metalsmith  = require('metalsmith'),
  markdown      = require('metalsmith-markdown'),
  permalink     = require('metalsmith-permalinks'),
  layouts       = require('metalsmith-layouts'),
  serve         = require('metalsmith-serve'),
  sass          = require('metalsmith-sass'),
  assets        = require('metalsmith-assets'),
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
  .use(permalink({
    pattern: ':collection/:date/:title'
  }))
  .use(layouts({
    'engine': 'handlebars',
    partials: 'partials'
  }))
  .use(assets({
    source: 'src/assets', // relative to the working directory 
    destination: './assets' // relative to the build directory 
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
