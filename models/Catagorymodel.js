const mongoose = require('mongoose');

const Schema = mongoose.Schema


const CatagorymodelSchema = new Schema({
    catagoryname: String,
    catagorytime: String
})




const Catagorymodel = mongoose.model('Catagorymodel', CatagorymodelSchema)

module.exports = Catagorymodel
