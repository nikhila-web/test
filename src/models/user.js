const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = Schema({
        email: {
            type: String,
            unique: true,
            required: true 
        },
        password: String,
        onboarded: { type: Boolean, default: false },
        name: String,
        userName:String
});
module.exports = User = mongoose.model('user', UserSchema)
