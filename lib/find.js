(function() {
  module.exports = function(query, next) {
    var request = require('request');
    var cheerio = require('cheerio');

    var uri = 'http://9gag.com/search?query=' + query;

    var result = {
      query: null,
      sectionHeader: null,
      result: []
    };

    request({
      uri: uri,
      method: 'GET'
      }, function(err, res, html) {

      if (err) {
        return next(err, null);  
      }

      var $ = cheerio.load(html);
      
      result.query = query;
      result.sectionHeader = $('div.section-header h3').text();
      result.result = $('ul.overview-list.badge-entry-collection > li').map(function() {
        var item = {
          title: null,
          id: null,
          url: null,
          author: null,
          image: null
        };
        item.title = $(this).children('.info').children('h3').text().trim();
        item.id = $(this).attr('data-entry-id');
        item.url = "http://9gag.com" + $(this).attr('data-entry-url');
        item.author = $(this).children('.info').children('p').children('a').text().trim();
        item.image = $(this).children('.post-container').children('img').attr('src');
        return item;
      }).get();

      return next(null, result);
    });
  }
}());