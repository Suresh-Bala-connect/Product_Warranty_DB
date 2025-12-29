const mongoose = require('mongoose');

const SigninSchema = new mongoose.Schema({
    userName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // repeatPassword: { type: String, required: true }
})

module.exports = mongoose.model('Signin', SigninSchema);

