import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let schema = new Schema({
	//_id: { type: String, required: true },
	gamertag: String,
	game: String,
	createdAt: {
		type: Date,
		expires: 60,
		default: Date.now
	}
});

export default mongoose.model('Scrims', schema, 'scrims');
