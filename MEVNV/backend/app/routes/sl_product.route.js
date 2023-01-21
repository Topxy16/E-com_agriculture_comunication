const express = require('express')
const slproductRoutes = express.Router();
const multer = require('multer');

//img upload
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb((null, "./uploads"));
    },
    filename: function (req, file, cb){
        cb(null. file.fieldname + "_" + Data.now() + "_" + file.originalname)
    }
});

var upload = multer({
    storage: storage,
}).single("image");

let slproductModel = require('../models/sl_product.model');

//view
slproductRoutes.route('/').get((req, res, next) => {
    slproductModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create
slproductRoutes.route('/create').post((req, res, next)=>{
    slproductModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }else{
            res.json(data);
        }
    })
})

// Edit
slproductRoutes.route('/edit/:id').get((req, res, next) => {
    slproductModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// update
slproductRoutes.route('/update/:id').put((req, res, next) => {
    slproductModel.findByIdAndUpdate(req.params.id,{
        $set: req.body
    }, (error, data) =>{
        if(error){
            return next(error);
        }else{
            res.json(data);
            console.log('Product successfully updated')
        }
    })
})

//delete
slproductRoutes.route('/delete/:id').delete((req, res, next) =>{
    slproductModel.findByIdAndDelete(req.params.id, (error, data) =>{
        if(error){
            return next(error)
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = slproductRoutes;