const mongoose = require('mongoose');
const { Schema } = mongoose;


module.exports.userRoleEnums = {
    vendor: 1,
    customer: 2
   
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        required: true
    }

},
    { timestamps: true }
);


const userModel = mongoose.model('user', userSchema);
module.exports.model = userModel;