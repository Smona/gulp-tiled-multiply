var through = require('through2');
const PLUGIN_NAME = 'gulp-tiled-multiply';

function multiply(buffer, multiplier) {
  multiplier = multiplier || 3;
  var data = JSON.parse(buffer.toString('utf8'));
  // triple overall map width
  data.width *= multiplier;

  data.layers.forEach(function (t) {
    // triple tile data
    var multipliedData = [];
    for (var row = 0; row < t.height; row++) {
      var rowData = t.data.slice(row * t.width, row * t.width + t.width);
      for (var i = 0; i < multiplier; i++) {
        rowData = rowData.concat(rowData);
      }
      multipliedData = multipliedData.concat(rowData);
    }
    t.data = multipliedData;

    // triple each layer width
    t.width *= multiplier;
  });

  return Buffer.from(JSON.stringify(data), 'utf8');
}

module.exports = function(multiplier) {
  return through.obj(function(file, encoding, callback) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return callback();
    }

    if (file.isBuffer()) {
      file.contents = multiply(file.contents, multiplier);
      this.push(file);
      callback();
    }
  });
};
