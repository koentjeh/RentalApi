const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const RentalSchema = new Schema({
	rentalType: { type: String, required: true },
	size: { type: String, required: true },
	prize: { type: Number, required: true }
});

module.exports = mongoose.model('Rental', RentalSchema);