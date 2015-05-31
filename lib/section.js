(function() {
  module.exports = function() {
    var request = require('request');
    var cheerio = require('cheerio');

    var section = arguments[0];
    var next = arguments[arguments.length - 1];
    delete arguments[arguments.length - 1];
    var subSection = arguments[1] ? arguments[1] : '';

    var uri = 'http://9gag.com/' + section + '/' + subSection;

    var result = [];

    request({
      uri: uri,
      method: 'GET'
      }, function(err, res, html) {

      if (err) {
        return next(err, null);  
      }

      var $ = cheerio.load(html);

      if ($('body').attr('id') ===  'page-404') {
        var err = {
          code: 404,
          message: 'Sorry, the page you are looking for doesn\'t exist'
        };
        return next(err, null);
      }
      
      result = $('div.badge-entry-collection > article').map(function() {
        var item = {
          title: null,
          id: null,
          url: null,
          image: null,
          points: null,
          commentCount: null
        };
        item.title = $(this).children('header').children('h2.badge-item-title').children('a').text().trim();
        item.id = $(this).attr('data-entry-id');
        item.url = "http://9gag.com" + $(this).children('div.badge-post-container').children('a').attr('href');
        item.image = $(this).children('div.badge-post-container').children('a').children('img').attr('src');
        item.points = $(this).children('p.post-meta').children('a.badge-evt.point').children('span.badge-item-love-count').text().trim();
        item.commentCount = $(this).children('p.post-meta').children('a.badge-evt.comment').text().trim();
        item.commentCount = item.commentCount.substring(0, item.commentCount.indexOf(' comments'));

        return item;
      }).get();

      return next(null, result);
    });
  }
}());