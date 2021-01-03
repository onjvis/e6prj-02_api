const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warningSchema = new Schema (
    {
        binId: { type: mongoose.ObjectId, required: true },
        type: { type: String, enum: ['battery', 'fullness', 'other'], required: true },
        timestamp: { type: Date, required: true },
        message: String
    }
);

const Warning = mongoose.model('Warning', warningSchema);
module.exports = Warning;
