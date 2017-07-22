var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.get('/hard_hands', function (req, res) {
  url = 'http://www.readybetgo.com/blackjack/strategy/bj-strategy-chart-1029.html';
  
  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      
      var hard_hands = {};

      $('div.art table').filter(function () {
        var data = $(this);
        var rows = data.find('tr');
        for (let i = 0; i < rows.length; i++) {
          var row = rows[i];

        };
      });
    }
    
    let out_file = 'output.json';

    fs.writeFile(out_file, JSON.stringify(hard_hands, null, 4), function (err) {
      console.log('File successfully written!');
    })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');

