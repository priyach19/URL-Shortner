const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
	shortURL: {
		type: String,
	},
	redirectURL: {
		type: String,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;