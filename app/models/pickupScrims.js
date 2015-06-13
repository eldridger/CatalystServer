import mongoose from 'mongoose';
import _ from 'lodash';

const Schema = mongoose.Schema;

let defaultObj = {
	type: String,
	required: true
};

let schema = new Schema({
	//_id: { type: String, required: true },
	gamertag: defaultObj,
	game: defaultObj,
	createdAt: {
		type: Date,
		expires: 60,
		default: Date.now
	}
});

export default mongoose.model('Scrims', schema, 'scrims');
