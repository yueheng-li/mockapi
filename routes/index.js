var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/booklist', function(req, res) {
	// 跨域访问设定
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	var db = req.db;
	var collection = db.get('bookcollection');
	collection.find({}, {}, function(e, docs){
		res.json(docs);
	});
});

/*
 * Get book.
 */
router.get('/book/:id/test/:name', function(req, res) {
	// 跨域访问设定
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	var id = req.params.id;
	var db = req.db;
	var collection = db.get('bookcollection');
	collection.find({"_id":id}, {}, function(e, docs){
		res.json(docs);
	});
});

/*
 * POST to adduser.
 */
router.post('/addbook', function(req, res) {
    var db = req.db;
    var collection = db.get('bookcollection');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
