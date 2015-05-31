(function() {
  var gag = {};

  gag.find = require('./lib/find');
  gag.getItem = require('./lib/getitem');
  gag.section = require('./lib/section');

  module.exports = gag;
}());