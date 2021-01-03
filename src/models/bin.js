const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const binSchema = new Schema (
    {
        location: { type: { latitude: Number, longitude: Number }, required: true },
        battery: { type: Number, required: true },
        fullness: { type: Number, required: true }
    }
);

const Bin = mongoose.model('Bin', binSchema);
module.exports.binSchema = binSchema;
module.exports = Bin;
