var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var path = require('path');
var config = require('../config');

var Shops = require('../models/shops.js');

/* GET shops listing. */
router.get('/', function(req, res, next) {
	var shops = {};
	shops.code = 200;
    shops.status = 200;
    shops.message = "List of Campaigns Information";
    shops.total_count = 11;
    shops.offset = 0;
    shops.limit = 0;
	//console.log(config.db.port);
    Shops.find({},{},function (err, docs) {
      var items = {};
      items.values = docs;
      shops.result = items;
      res.json(shops);
    });
});

/* GET shops listing. */
router.get('/:shopId/campaigns', function(req, res, next) {
	var id = req.params.shopId;
	var campaignId  = req.query.campaign_id;
	var offset  = req.query.offset;
	var limit  = req.query.limit;
	var code  = req.query.code;
	returnResponse(code, res);
	var shops = {};
	shops.code = 200;
    shops.status = 200;
    shops.message = "List of Campaigns Information";
    
	var o = 0;
	var l = 0;
	if (offset != null && offset != 'undefined') {
		o = offset;
	}
	var query = Shops.find({});
	query.where('shop_id', id);
	if (campaignId != null && campaignId != 'undefined') {
		query.where('campaign_id', campaignId);
	}
	if (limit != null && limit != 'undefined') {
		l = limit;
		query.limit(l);
	}
	var totalCount = 0;
	query.exec(function (err, docs) {
	  var items = {};
      items.values = docs;
      shops.result = items;
      totalCount = docs.length;
	  shops.total_count = totalCount;
      res.json(shops);
	});
    shops.offset = o;
    shops.limit = l;
});



/* GET New User page. */
router.get('/addshops', function(req, res) {
    res.render('addshops', { title: 'Add New User' });
});


/* POST to Add User Service */
router.post('/addshop', function(req, res) {

    // Get our form values. These rely on the "name" attributes
    var shopId = req.body.shopId;
    var campaignId = req.body.campaignId;
    var campaignName = req.body.campaignName;
    var startdate = req.body.startdate;
    var enddate = req.body.enddate;
    var budget = req.body.budget;
    var discounttype = req.body.discounttype;
    var discountrate = req.body.discountrate;
    var couponbatchdate = req.body.couponbatchdate;
    var enableexclusion = req.body.enableexclusion;
    var allowcombined = req.body.allowcombined;
    var itemregistrationtype = req.body.itemregistrationtype;
    var maxorder = req.body.maxorder;
    var status = req.body.status;

    var shop = {};
    shop.shop_id = shopId;
    shop.campaign_id = campaignId;
    shop.campaign_name = campaignName;
    shop.start_date = startdate;
    shop.end_date = enddate;
    shop.budget = budget;
    shop.discount_type = discounttype;
    shop.discount_rate = discountrate;
    shop.coupon_batch_date = couponbatchdate;
    shop.enable_exclusion = enableexclusion;
    shop.allow_combined = allowcombined;
    shop.item_registration_type = itemregistrationtype;
    shop.max_order = maxorder;
    shop.status = status;
    // Set our collection
    Shops.collection.insert(shop, onInsert);
	function onInsert(err, docs) {
	    if (err) {
	        // TODO: handle error
	        console.log("err");
	        res.send("There was a problem adding the information to the database.");
	    } else {
	        res.redirect("shoplist");
	    }
	}
    // Submit to the DB
});
/* GET Userlist page. */
router.get('/shoplist', function(req, res) {
	Shops.find({},{},function (err, docs) {
    	var ob = JSON.stringify(docs)
    	var as = JSON.parse(ob);
    	//console.log(ob);
        res.render('shoplist', {
            results : as
        });
    });
});

router.post('/delshop/:id', function(req, res) {
	var id = req.params.id;
	Shops.remove({ _id: id }, function(err) {
	    if (!err) {
	            console.log("succ");
	            res.status(200);
	            res.json({'status':'ok'});

	    }
	    else {
	    		res.status(500);
	            res.json({'status':'ng'});
	    }
	});
});



router.post('/:id/campaigns', function(req, res) {

	
	var id = req.params.id;
	returnResponse(id, res);
	
	var body =  req.body;
	var resJson = {
			"code": 200,
			"status": 200,
			"message": "List of Campaigns Information",
			"result": {
			}
		};
	resJson.result.value = body;
	res.json(resJson);
});


router.post('/campaigns', function(req, res) {
	
	var body =  req.body;
	var resJson = {
			"code": 200,
			"status": 200,
			"message": "List of Campaigns Information",
			"result": {
			}
		};
	resJson.result.value = body;
	res.json(resJson);
});

function returnResponse(code, res) {

	if (code == 400) {
		res.status(400);
		var r = {
		  "code": 400,
		  "status": "ng",
		  "message": "Bad Request"
		}
		res.json(r);
	} else if (code == 401) {
		res.status(401);
		var r = {
		  "code": 401,
		  "status": "ng",
		  "message": "Unauthorized Access"
		}
		res.json(r);
	} else if (code == 404) {
		res.status(404);
		var r = {
		  "code": 404,
		  "status": "ng",
		  "message": "Not Found"
		}
		res.json(r);
	} else if (code == 500) {
		res.status(500);
		var r = {
		  "code": 500,
		  "status": "ng",
		  "message": "Internal Server Error"
		}
		res.json(r);
	} else if (code == 999) {
		res.status(999);
		var r = {
		  "code": 999,
		  "status": "ng",
		  "message": "Unexpected Error"
		}
		res.json(r);
	}
}
module.exports = router;
