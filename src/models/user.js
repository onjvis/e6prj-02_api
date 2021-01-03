const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 13;

const Schema = mongoose.Schema;

const userSchema = new Schema (
    {
        username: { type: String, required: true, unique: true },
        hash: { type: String, required: true },
        role: { type: String, enum: ['admin', 'user'], required: true }
    }
);

userSchema.methods.setPassword = async function(password) {
    this.hash = await bcrypt.hash(password, saltRounds);
};

userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.hash);
};

userSchema.methods.generateJwt= function() {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000), // as Unix time in seconds
    }, process.env.JWT_SECRET);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
