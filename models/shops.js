var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var shopSchema = new Schema({
		id : {
			type: String,
			getter: function(val) { return this._id.toString(); },
			unique: true
		},
		shop_id : String,
		campaign_id : Number,
		campaign_name : String,
		start_date : Date,
		end_date : Date,
		budget : Number,
		discount_type : String,
		discount_rate : Number,
		coupon_batch_date : Date,
		enable_exclusion : Boolean,
		allow_combined : Boolean,
		max_order : Number,
		item_registration_type : String,
		status : String,
});

module.exports = mongoose.model('shops', shopSchema);