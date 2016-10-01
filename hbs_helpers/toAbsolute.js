module.exports = function(str, options) {
  if (options == null) {
    var options = str;
    var str = '';
  }

  return options.data.root.urlPrefix + '/' + str;
}