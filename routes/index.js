var express = require('express');
var GoogleSpreadsheet = require("google-spreadsheet");
var router = express.Router();

router.get('/', function(req, res) {
  var mySheet = new GoogleSpreadsheet('172SQyiLXHDOmQjtWxhu8uRmJPmcDYEd0wcVa1f7A5P0');


  mySheet.getRows(1, function(err, rowData) {

    var cat = [];
    var catN = [];

    rowData.forEach(function(item) {
        if(cat.indexOf(item['h']) == -1) {
            cat.push(item['h']);
        }
    });

      var i = 1;
      cat.forEach(function(item) {
          catN.push({name: item, cls: 'cat' + i++, data: []});
      });

      rowData.forEach(function(item) {
          catN.forEach(function(elem) {
              if(elem.name == item['h']) {
                  elem.data.push({a: item['a'], q: item['q'], t:item['t'], cls: elem.cls, c: item['h']});
              }
          });
      });

    res.render('index', { title: 'FAQ ФКН', cat: catN });
  });


});

module.exports = router;
