const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carModel: {
    type: String,
    required: true,
    minlength: 3
  },
  price: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  maxPictures: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  selectedImages: {
    type:[String],
    required: true,
  },
 
});

const AddCar = mongoose.model('AddCar', carSchema);

module.exports = AddCar;
