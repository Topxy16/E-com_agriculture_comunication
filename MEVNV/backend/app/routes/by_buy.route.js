const express = require('express')
const byorderRoutes = express.Router();

let byorderModel = require('../models/by_order.model');

//view
byorderRoutes.route('/get-order').get((req, res, next) => {
    byorderModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create
byorderRoutes.route('/create-buy').post((req, res, next)=>{
    byorderModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }else{
            res.json(data);
        }
    })
})

// Edit
byorderRoutes.route('/edit-buy/:id/').get((req, res, next) => {
    byorderModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// update
byorderRoutes.route('/update-buy/:id').put((req, res, next) => {
    byorderModel.findByIdAndUpdate(req.params.id,{
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
byorderRoutes.route('/delete-buy/:id').delete((req, res, next) =>{
    byorderModel.findByIdAndDelete(req.params.id, (error, data) =>{
        if(error){
            return next(error)
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = byorderRoutes;