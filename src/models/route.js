const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const routeSchema = new Schema (
    {
        // Bin IDs
        bins: { type: [mongoose.ObjectId], required: true },
        assignee: { type: mongoose.ObjectId }
    }
);

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;
