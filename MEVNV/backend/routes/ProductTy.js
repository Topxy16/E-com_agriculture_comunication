const express = require('express')
const router = express.Router()
const authJwt = require('../middleware/authJwt')
const db = require('../lib/db.js')

// get Product Type
router.get('/product-type', (req, res) => {
  db.query(`select * from product_type;`, (err, data) => {
    if (err) {
      return res.status(401).send({
        message: err.message
      })
    } else {
      return res.status(200).send(
        data
      )
    }
  })
})

router.get('/product-type/veget', (req, res) => {
  db.query(`SELECT product.*, product.py_id
  FROM product
  WHERE product.py_id = '16';`, (err, data) => {
    if (err) {
      return res.status(401).send({
        message: err.message
      })
    } else {
      return res.status(200).send({
        data,
        totle: data.length
      }
       
        
      )
    }
  })
})
router.get('/product-type/fruit', (req, res) => {
  db.query(`SELECT product.*, product.py_id
  FROM product
  WHERE product.py_id = '15';`, (err, data) => {
    if (err) {
      return res.status(401).send({
        message: err.message
      })
    } else {
      return res.status(200).send({
        data,
        totle: data.length
      }
        
      )
    }
  })
})
router.get('/product-type/flower', (req, res) => {
  db.query(`SELECT product.*, product.py_id
  FROM product
  WHERE product.py_id = '13';`, (err, data) => {
    if (err) {
      return res.status(401).send({
        message: err.message
      })
    } else {
      return res.status(200).send({
        data,
        totle: data.length
      }
     
      )
    }
  })
})
router.get('/product-type/tree', (req, res) => {
  db.query(`SELECT product.*, product.py_id
  FROM product
  WHERE product.py_id = '14';`, (err, data) => {
    if (err) {
      return res.status(401).send({
        message: err.message
      })
    } else {
      return res.status(200).send({
        data,
        totle: data.length
      }
      )
    }
  })
})

// search Product Type
router.get('/product-type/search', (req, res) => {
  const name = req.query.name
  db.query(
    `select * from product_type where product_type_name like '%${name}%';`,
    (err, data) => {
      if (err) {
        return res.status(401).send({
          message: err.message
        })
      } else {
        return res.status(200).send({
          data,
          total: data.length
        })
      }
    }
  )
})

// create Product Type
router.post(
  '/product-type',
  [authJwt.verifyToken, authJwt.isAdmin],
  (req, res) => {
    const name = req.body.name
    db.query(
      `select * from product_type where product_type_name = '${name}';`,
      (err, data) => {
        if (err) {
          return res.status(401).send({
            message: err.message
          })
        } else {
          if (data.length > 0) {
            return res.status(403).send({
              message: 'Product type is already'
            })
          } else {
            db.query(
              `insert into product_type (product_type_name) values ('${name}');`,
              (err, result) => {
                if (err) {
                  return res.status(401).send({
                    message: err.message
                  })
                } else {
                  return res.status(201).send({
                    message: 'inserted successfully'
                  })
                }
              }
            )
          }
        }
      }
    )
  }
)

router.delete('/product-type/:product_type_id', [authJwt.verifyToken], (req, res) => {
  const product_type_id = req.params.product_type_id
  db.query(
    `select product_type_id from product_type where product_type_id = ${product_type_id};`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          code: err.code,
          message: err.message
        })
      } else {
        if (result.length === 0) {
          return res.status(404).send({
            message: 'product_type_id not found'
          })
        } else {
          db.query(
            `delete from product_type where product_type_id = ${product_type_id}`,
            (err) => {
              if (err) {
                return res.status(400).send({
                  code: err.code,
                  message: err.message
                })
              } else {
                return res.status(200).send({
                  message: 'delete succeeded'
                })
              }
            }
          )
        }
      }
    }
  )
})

// update Product type
router.patch(
  '/product-type/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  (req, res) => {
    const id = req.params.id
    const name = req.body.name
    console.log(req.body)
    db.query(
      `select * from product_type where product_type_id = ${id};`,
      (err, data) => {
        if (err) {
          return res.status(401).send({
            message: err.message
          })
        } else {
          if (data.length === 0) {
            return res.status(404).send({
              message: 'Product type id not found'
            })
          } else {
            db.query(
              `update product_type set product_type_name = '${name}' where product_type_id = ${id};`,
              (err, result) => {
                if (err) {
                  return res.status(401).send({
                    message: err.message
                  })
                } else {
                  return res.status(200).send({
                    message: 'Product type updated successfully'
                  })
                }
              }
            )
          }
        }
      }
    )
  }
)

module.exports = router
