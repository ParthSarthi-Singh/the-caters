const mongoose = require('mongoose');
const { Schema } = mongoose;


const vendorSchema = new mongoose.Schema({
    ownerName: {
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
    shopName: {
        type: String,
        required: true,
        unique : true
    },
    shopAddress: {
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


const vendorModel = mongoose.model('vendor', vendorSchema);
module.exports.model = vendorModel;