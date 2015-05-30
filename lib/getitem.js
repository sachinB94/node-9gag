(function() {
  module.exports = function(id, next) {
    var request = require('request');
    var cheerio = require('cheerio');

    var item = {
      title: null,
      points: null,
      commentCount: null,
      image: null,
    };

    request({
      uri: 'http://9gag.com/gag/' + id,
      method: 'GET'
      }, function(err, res, html) {

      if (err) {
        return next(err, null);  
      }

      var $ = cheerio.load(html);
      
      item.title = $('h2.badge-item-title').text().trim();
      item.points = $('span.badge-item-love-count').text();
      item.commentCount = $('span.badge-item-comment-count').text();
      item.image = $('img.badge-item-img').attr('src');

      return next(null, item);
    });
  }
}());