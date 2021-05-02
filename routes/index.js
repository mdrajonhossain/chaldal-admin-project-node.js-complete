var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var multer  = require('multer');
var Auth = require('../models/Auth');
var Catagorymodel = require('../models/Catagorymodel');
var Products = require('../models/Products');
const fs = require('fs').promises;

var url = 'http://192.168.2.103:3000';

var session = require('express-session');
router.use(session({
  name : 'app.sid',
  secret: "1234567890QWERTY",
  resave: true,
  saveUninitialized: true
}));

var storage = multer.diskStorage({
  destination: './upload',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg')}
})
var upload = multer({ storage: storage })


/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.username){
    res.render('index');
  }else{
    res.redirect('dashboardpancel');
  }
});


router.get('/dashboardpancel', function(req, res, next) {
	if(!req.session.username){
		res.render('index');
	  }else{
		res.render('dashboard');
	  }  
});


router.post('/adminlogin', (req, res) => {
	const username  = req.body.username;
	const password  = req.body.password;	
	Auth.findOne({username})
		.then(user => {
			if(user){
				bcrypt.compare(password, user.password, function(err, result) {					
					console.log(result);
      				 if(result){
      					req.session.username = username;
      					// req.session.password = password;
						    res.redirect('dashboardpancel');
      				 }else{						      				 
						    res.redirect('/');
      				 }
				});
				}else{					
				res.redirect('/');
			}
		}) 
})

router.get('/logout',(req,res)=>{	
	req.session.destroy(function (err) {
		if(!err){  		
		  res.redirect('/');
		}
	 });
  })


router.get('/catagoryget', function(req, res, next) {
	if(!req.session.username){
		res.render('index');
	  }else{
		Catagorymodel.find({}, function(err, catagoryitem){		
			res.render('catagory',{catagoryitem:catagoryitem});		
		})
	  }
});


router.get('/catagorydel/:id', (req, res) => {	  
	Catagorymodel.findByIdAndRemove(req.params.id, function (err, data) {		
		res.redirect(url+'/catagoryget');
	})
})


router.post('/postcatagory', (req, res) => {
	d = new Date();
   const catagorytime = d.toLocaleString();	

	const catagor = new Catagorymodel({
			   catagoryname:req.body.catagoryname,
			   catagorytime:catagorytime });
			   catagor.save();
	res.redirect('catagoryget');
})


router.get('/productget', function(req, res, next) {
	if(!req.session.username){
		res.render('index');
	  }else{
		Catagorymodel.find({}, function(err, productitem){		
			Products.find({}, function(err, producsts){						
				res.render('product',{producsts:producsts, productitem:productitem});		
			})
		})
	  } 
});


router.use('/profile', express.static('upload'));
router.post('/productdatabasing', upload.single('prodage'),(req, res) => {

	const productimage = `${url}/profile/${req.file.filename}`	
		d = new Date();
   		const producttime = d.toLocaleString();
		   const productsave = new Products({
				catagorytype:req.body.catagorytype,
				productname:req.body.productname,
				productprice:req.body.productprice,
				productimage:productimage,
				productsize:req.body.productsize,
				productoffer:req.body.productoffer,
				productofferprice:req.body.productofferprice,
				productcolor:req.body.productcolor,
				createdate:producttime,
				updatedate:producttime});
			productsave.save();
	res.redirect('productget');
})


router.get('/productdele/:id', (req, res) => {
	Products.findById(req.params.id, function (err, datax) {
		fs.unlink('./upload/'+datax.productimage.substr(30));  
		Products.findByIdAndRemove(req.params.id, function (err, data) {		
			res.redirect('/productget');
		})
	})	
})


router.get('/productoffer/:id', (req, res) => {	
	Products.findOneAndUpdate({_id:req.params.id},{productoffer:"Yes"}, function (err, data){		
		res.redirect(url+'/productget');
	})	
})


router.get('/productofferexit/:id', (req, res) => {	
	Products.findOneAndUpdate({_id:req.params.id},{productoffer:"No"}, function (err, data){		
		res.redirect(url+'/productget');
	})	
})


 






// ==========================// React.js Rest --API
router.get('/productgetapi', function(req, res, next) {	
		Products.find({}, function(err, producsts){	
			res.json({ producsts: producsts })
	})
});





module.exports = router;
