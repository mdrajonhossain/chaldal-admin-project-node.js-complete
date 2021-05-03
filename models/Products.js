const mongoose = require('mongoose');

const Schema = mongoose.Schema


const ProductsSchema = new Schema({           
    catagorytype : String,
    subcatagorytype : String,
    productname : String,
    productprice : String,
    productimage : String,
    productsize : String,
    productoffer : String,
    productofferprice : String,
    productcolor: String,  
    createdate: String,
    updatedate: String,    
})

const Products = mongoose.model('Products', ProductsSchema)

module.exports = Products

