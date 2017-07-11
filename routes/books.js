var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var path = require('path');
var config = require('../config');

var Books = require('../models/books.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	//console.log(config.db.port);
    Books.find({},{},function (err, docs) {
      res.json(docs);
    });
});

/*
 * Get book list.
 */
router.get('/booklist', function(req, res) {

    Books.find({},{},function (err, docs) {
      res.json(docs);
    });
});

/*
 * Get book.
 */
router.get('/book/:id/test/:name', function(req, res) {

	var id = req.params.id;

	Books.find({"_id":id},{},function (err, docs) {
      res.json(docs);
    });
});

/*
 * post add book .
 */
router.post('/addbook', function(req, res) {

	// 跨域访问设定
	console.log(req.body.data.name);
	console.log(req.body.data.img);
	console.log(req.body.data.description);
	console.log(req.body.data.imgPath.name);
	var img = req.body.data.img;
	var name = req.body.data.name;
	var des = req.body.data.description;
	var update = {
		"name" : name,
		"img" : img,
		"description" : des,
	};
	console.log(update);
    Books.update({"_id":req.body.data._id}, update, function(err) {
	  if (err) return res.json({
	    'status': 'ng',
	    'url': req.originalUrl,
	    'error': 'Not found'
	  });

	  return res.json({
	    'status': 'ok',
	    'url': req.originalUrl,
	    'error': ''
	  });

	});

});

// 文件上传
router.post('/upload', function(req, res) {
	 console.log("start");
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		/*if (files.file && files.file != 'undefined') {
	       var old_path = files.file.path,
	       		file_size = files.file.size,
	       		file_ext = files.file.name,
				target_path = 'C:\\A-LICHUNHUI\\03-TypeScript\\ng-books\\node\\public\\images/222.jpg';
				//console.log(process.env)
				//console.log(path.join(process.env.PWD, '/images/222.jpg'));
	       	fs.readFile(old_path, "binary", function(error, data) {
	       		console.log("data : " + data)
			    fs.writeFile(target_path, data, function(error) {
			    	fs.unlink(old_path, function(err) {
			            if (err) {
			            	console.log(err);
			                res.json({'success':false});
			            } else {
			            	res.json({'success':true});
			            }
			        });
			    });
			});
		}*/
		console.log(path.resolve(__dirname));
		var tmp_path = files.file.path;
	    // Set where the file should actually exists - in this case it is in the "images" directory.
	    target_path = config.uploadDir + files.file.name;
	    // Move the file from the temporary location to the intended location
	    fs.renameSync(tmp_path, target_path, function(err) {
	        // Delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files.
	        fs.unlink(tmp_path, function() {
	            if (err) {
	            	console.log(err);
	                res.json({'success':false});
	            } else {
	            	res.json({'success':true});
	            }
	        });
	    });
    });

});

module.exports = router;
