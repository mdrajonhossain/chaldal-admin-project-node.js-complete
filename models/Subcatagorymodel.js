const mongoose = require('mongoose');

const Schema = mongoose.Schema


const SubcatagorySchema = new Schema({    
    subcatagorytype : String,
    subcatagoryimage: String,
    subcatagoryname: String, 
    createdate: String,
    updatedate: String       
})



const Subcatagorymodel = mongoose.model('Subcatagorymodel', SubcatagorySchema)

module.exports = Subcatagorymodel
