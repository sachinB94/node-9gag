(function() {
  module.exports = function(id, next) {

    var request = require('request');
    var cheerio = require('cheerio');

    var uri = 'http://9gag.com/gag/' + id;

    var item = {
      title: null,
      points: null,
      commentCount: null,
      image: null,
    };

    request({
      uri: uri,
      method: 'GET'
      }, function(err, res, html) {

      if (err) {
        return next(err, null);  
      }

      var $ = cheerio.load(html);
      
      if ($('body').attr('id') === 'page-404') {
        err.code = 404;
        err.message = 'Sorry, the page you are looking for doesn\'t exist';
        return next(err, null);
      }

      item.title = $('h2.badge-item-title').text().trim();
      item.points = $('span.badge-item-love-count').text();
      item.commentCount = $('span.badge-item-comment-count').text();
      item.image = $('img.badge-item-img').attr('src');

      return next(null, item);
    });
  }
}());