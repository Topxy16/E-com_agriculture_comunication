const express = require('express')
const productRoutes = express.Router();

let ProductModel = require('../models/Product');

productRoutes.route('/').get((req, res, next) => {
    ProductModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create
productRoutes.route('/create-product').post((req, res, next)=>{
    ProductModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }else{
            res.json(data);
        }
    })
})

// Edit
productRoutes.route('/edit-product/:id').get((req, res, next) => {
    ProductModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// update
productRoutes.route('/update-product/:id').put((req, res, next) => {
    ProductModel.findByIdAndUpdate(req.params.id,{
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
productRoutes.route('/delete-product/:id').delete((req, res, next) =>{
    ProductModel.findByIdAndDelete(req.params.id, (error, data) =>{
        if(error){
            return next(error)
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = productRoutes;