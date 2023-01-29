const express = require('express')
const router = express.Router()
const authJwt = require('../middleware/authJwt')
const db = require('../lib/db.js')

// get Product All
router.get('/product', (req, res) => {
  db.query(
    `select product.*, db_image.image from product LEFT JOIN db_image ON db_image.product_id = product.product_id;`,
    (err, data) => {
      if (err) {
        return res.status(401).send({
          message: err.message
        })
      } else {
        return res.status(200).json({
          data: data,
          total: data.length
        })
      }
    }
  )
})

// get Product By Cart_Shop ID
router.get('/cart-product', (req, res) => {
  db.query(
    `SELECT * FROM product;`,
    (err, data) => {
      if (err) {
        return res.status(401).send({
          message: err.message
        })
      } else {
        db.query(
          `SELECT cart_shop.*, product.* FROM cart_shop , product WHERE cart_shop.product_id = product.product_id;`,
          (err, data) => {
            if (err) {
              return res.status(401).send({
                message: err.message
              })
            } else {
              return res.status(200).json({
                data: data,
                total: data.length
              })
            }
          }
        )
      }
    }
  )

})

// get Order By User ID for cart page
router.get('/GetOder-forCart', [authJwt.verifyToken], (req, res) => {
  const user_id = req.user.user_id
  db.query(
    `SELECT * FROM cart_shop WHERE cart_shop.user_id = ${user_id};`,
    (err, data) => {
      if (err) {
        return res.status(401).send({
          message: err.message
        })
      } else {
        return res.status(200).json({
          data: data,
          total: data.length
        })
      }
    }
  )
})

// get OrderCart By User ID for Order page
router.get('/GetCart-forOder', [authJwt.verifyToken], (req, res) => {
  const user_id = req.user.user_id
  db.query(
    `SELECT orde.*, orde_detail.orde_d_id, orde_detail.product_id, orde_detail.product_number, product.product_price, product.product_name
    FROM orde 
      LEFT JOIN orde_detail ON orde_detail.orde_id = orde.orde_id
      , product WHERE orde.user_id = ${user_id};`,
    (err, data) => {
      if (err) {
        return res.status(401).send({
          message: err.message
        })
      } else {
        return res.status(200).json({
          data: data,
          total: data.length
        })
      }
    }
  )
})

// create Order and Order Detail to cart
router.post('/create-Order-to-cart/:product_id', [authJwt.verifyToken], (req, res) => {
  const product_id = req.params.product_id
  const user_id = req.user.user_id
  var order_id = 0

  db.query(
    `SELECT * FROM product WHERE product_id = ${product_id};`,
    (err, result) => {
      if (err) {
        return res.status(401).send({
          message: err.message
        })
      } else {
        order_id = parseInt(result.insertId)
        db.query(
          `INSERT INTO cart_shop (user_id, payment_status, product_id, product_number) VALUES (${user_id},'0','${product_id}', '1');`,
          (err) => {
            if (err) {
              return res.status(401).send({
                message: err.message,
                err
              })
            } else {
              return res.status(201).send({
                message: 'insert successfully',
              })
            }
          }
        )
      }
    }
  )
})

// create OrderCart and Order Detail to cart
router.post('/create-Order-to-Order/:product_id,:product_number', [authJwt.verifyToken], (req, res) => {
  const product_id = req.params.product_id
  const product_number = req.params.product_number
  const totalprice = req.params.totalprice
  const user_id = req.user.user_id
  var order_id = 0

  db.query(
    `INSERT INTO orde (user_id, payment_status) VALUES ('${user_id}', '0');`,
    (err, result) => {
      if (err) {
        return res.status(401).send({
          message: err.message
        })
      } else {
        order_id = parseInt(result.insertId)
        db.query(
          `SELECT * FROM product WHERE product_id = ${product_id}`,
          (err) => {
            if (err) {
              return res.status(401).send({
                message: err.message,
                err
              })
            } else {
              db.query(
                `INSERT INTO orde_detail (orde_id, product_id, product_number) VALUES (${order_id}, '${product_id}', '${product_number}');`,
                (err) => {
                  if (err) {
                    return res.status(401).send({
                      message: err.message,
                      err
                    })
                  } else {
                    return res.status(201).send({
                      message: 'insert successfully',
                    })
                  }
                }
              )
            }
          }
        )
      }
    }
  )
})



// delete Order
router.delete('/order/:orde_id', [authJwt.verifyToken], (req, res) => {
  const orde_id = req.params.orde_id
  db.query(
    `select orde_id from orde where orde_id = ${orde_id};`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          code: err.code,
          message: err.message
        })
      } else {
        if (result.length === 0) {
          return res.status(404).send({
            message: 'orde_id not found'
          })
        } else {
          db.query(
            `delete from orde where orde_id = ${orde_id}`,
            (err, result) => {
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

// delete OrderCart
router.delete('/cart/:cart_shop_id', [authJwt.verifyToken], (req, res) => {
  const cart_shop_id = req.params.cart_shop_id
  db.query(
    `select cart_shop_id from cart_shop where cart_shop_id = ${cart_shop_id};`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          code: err.code,
          message: err.message
        })
      } else {
        if (result.length === 0) {
          return res.status(404).send({
            message: 'cart_shop_id not found'
          })
        } else {
          db.query(
            `delete from cart_shop where cart_shop_id = ${cart_shop_id}`,
            (err, result) => {
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

// create Product Detail
router.post(
  '/product/detail/:product_id',
  [authJwt.verifyToken, authJwt.isStore],
  (req, res) => {
    const product_id = req.params.product_id
    const py_id = req.body.product_type_id
    const pd_description = req.body.product_detail
    db.query(
      `select * from product where product_id = ${product_id}`,
      (err, data) => {
        if (err) {
          return res.status(401).send({
            message: err.message
          })
        } else {
          if (data.length === 0) {
            return res.status(404).send({
              message: 'Product ID not found'
            })
          } else {
            db.query(
              `insert into product_detail (product_id, py_id, pd_description) values (${product_id}, ${py_id}, '${pd_description}');`,
              (err, data) => {
                if (err) {
                  return res.status(401).send({
                    message: err.message
                  })
                } else {
                  return res.status(201).send({
                    message: 'Create Product Detail successfully'
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

// Update Product
router.patch(
  `/product/:product_id`,
  [authJwt.verifyToken, authJwt.isStore],
  (req, res) => {
    const product_id = req.params.product_id
    const product_name = req.body.product_name
    const product_price = req.body.product_price
    const product_number = req.body.product_number
    db.query(
      `select * from product where product_id = ${product_id};`,
      (err, data) => {
        if (err) {
          return res.status(401).send({
            message: err.message
          })
        } else {
          if (data.length === 0) {
            return res.status(404).send({
              message: 'Product ID not found'
            })
          } else {
            db.query(
              `update product set product_name = '${product_name}', product_price = '${product_price}', product_number = ${product_number} where product_id = ${product_id}`,
              (err, result) => {
                if (err) {
                  return res.status(401).send({
                    message: err.message
                  })
                } else {
                  return res.status(200).send({
                    message: 'Updated successfully'
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

// Update Product Detail
router.patch(
  '/product/detail/:product_id',
  [authJwt.verifyToken, authJwt.isStore],
  (req, res) => {
    const product_id = req.params.product_id
    const py_id = req.body.product_type_id
    const pd_description = req.body.product_detail
    db.query(
      `select * from product where product_id = ${product_id};`,
      (err, data) => {
        if (err) {
          return res.status(401).send({
            message: err.message
          })
        } else {
          if (data.length === 0) {
            return res.status(404).send({
              message: 'Product ID not found'
            })
          } else {
            db.query(
              `update product_detail set py_id = ${py_id}, pd_description = '${pd_description}' where product_id = ${product_id};`,
              (err, result) => {
                if (err) {
                  return res.status(401).send({
                    message: err.message
                  })
                } else {
                  return res.status(200).send({
                    message: 'Updated successfully'
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
