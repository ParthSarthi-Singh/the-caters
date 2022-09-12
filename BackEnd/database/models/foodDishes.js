const mongoose = require('mongoose');
const { Schema } = mongoose;


const foodDisheSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        img:{
            data : Buffer,
            contentType : String
        },
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    vendorId: {
        type: String,
        required: true
    }

},
    { timestamps: true }
);


const foodDishesModel = mongoose.model('foodDish', foodDisheSchema);
module.exports.model = foodDishesModel;