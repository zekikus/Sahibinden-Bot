/**
 * Created by Zeki on 19.06.2017.
 */
var express = require('express');
var router = express.Router();
var request = require('request'); // İstek yapmak için kullanılacak paket.
var cheerio = require('cheerio'); // Getirilen veriyi parçalamak için kullanılacak paket.

const url = "https://www.sahibinden.com/";

router.get('/getSinglePageResult/:query',function (req,res,next) {
    var result = [];

    var reqUrl = url + req.params.query;
    singlePageRequest(res, result, reqUrl);

});


router.get('/getRangeResult/:query',function (req,res,next) {
    var result = [];

    var beginPage = (req.query.begin && req.query.begin > 0) ? req.query.begin : 1;
    var endPage = (req.query.end && req.query.end > 0) ? req.query.end : beginPage;

    var query = req.params.query;
    rangeResult(--beginPage, endPage, res, result, query);

});

router.get('/getSubCategories/:query',function (req,res,next) {
    var result = [];

    var reqUrl = url + 'alt-kategori/' + req.params.query;
    console.log(reqUrl);
    request(reqUrl, function (error, response, html) {
        if ( ! error && response.statusCode == 200) {

            var $ = cheerio.load(html);

            $('ul.allCategoriesList li').each(function(i, element){
                var gTitle = $(this).find('div a').text();
                var gCount = $(this).find('div span').text();

                if(gTitle != "" || gCount != ""){
                    result.push({title:gTitle,count:gCount
                    });
                }

            });

            res.json(result);
        }
    });
});

router.get('/getBrandSubCategories/:query',function (req,res,next) {
    var result = [];

    var reqUrl = url + req.params.query;
    console.log(reqUrl);
    request(reqUrl, function (error, response, html) {
        if ( ! error && response.statusCode == 200) {

            var $ = cheerio.load(html);

            $('#searchCategoryContainer li.cl3').each(function(i, element){
                var gTitle = $(this).find('a').text();
                var gCount = $(this).find('span').text();

                if(gTitle != "" || gCount != ""){
                    result.push({title:gTitle,count:gCount
                    });
                }
            });

            res.json(result);
        }

    });

});

function singlePageRequest(res,result,reqUrl){

    console.log(reqUrl);
    request(reqUrl, function (error, response, html) {
        if ( ! error && response.statusCode == 200) {

            var $ = cheerio.load(html);

            $('tr.searchResultsItem').each(function(i, element){
                this.attributes = [];
                this.attributes = $(this).find('td.searchResultsAttributeValue').text().split('\n');
                this.attributes = cleanSpace(this.attributes);

                result.push({title:$(this).find('a.classifiedTitle').text().trim(),
                    price:$(this).find('td.searchResultsPriceValue').text().trim(),
                    attr:[{year:this.attributes[1],km:this.attributes[2],color:this.attributes[3]}],
                    date:$(this).find('td.searchResultsDateValue').text().replace(/\s/g,''),
                    location:$(this).find('td.searchResultsLocationValue').text().replace(/\s/g,''),
                    img:$(this).find('td.searchResultsLargeThumbnail img').attr('src')
                });

            });

            res.json(result);
        }

    });
}

function rangeResult(counter,pageNumber,res,result,query) {
    var reqUrl = url + query;
    reqUrl = (counter == 0) ? reqUrl : reqUrl + "?pagingOffset=" + ((counter) * 20);
    console.log(reqUrl);
    request(reqUrl, function (error, response, html) {
        if ( ! error && response.statusCode == 200) {

            var $ = cheerio.load(html);

            $('tr.searchResultsItem').each(function(i, element){
                this.attributes = [];
                this.attributes = $(this).find('td.searchResultsAttributeValue').text().split('\n');
                this.attributes = cleanSpace(this.attributes);

                result.push({title:$(this).find('a.classifiedTitle').text().trim(),
                    price:$(this).find('td.searchResultsPriceValue').text().trim(),
                    attr:[{year:this.attributes[1],km:this.attributes[2],color:this.attributes[3]}],
                    date:$(this).find('td.searchResultsDateValue').text().replace(/\s/g,''),
                    location:$(this).find('td.searchResultsLocationValue').text().replace(/\s/g,''),
                    img:$(this).find('td.searchResultsLargeThumbnail img').attr('src')
                });

            });
            if(counter == pageNumber-1 || (pageNumber - 1) < counter){
                res.json(result);
            }else{
                rangeResult(++counter,pageNumber,res,result,query);
            }
        }

    });
}

// Boşlukları Temizle
function cleanSpace(array) {
    for (var i=0; i < array.length; i++){
        array[i] = array[i].replace(/\s/g,'');
    }
    return array;
}

module.exports = router;