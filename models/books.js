var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bookSchema = new Schema({
		id : {
			type: String,
			getter: function(val) { return this._id.toString(); },
			unique: true
		},
		name : String,
		img : String,
		description : String,
});

module.exports = mongoose.model('books', bookSchema);