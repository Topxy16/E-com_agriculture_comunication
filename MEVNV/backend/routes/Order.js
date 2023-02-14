const express = require('express')
const router = express.Router()
const authJwt = require('../middleware/authJwt')
const db = require('../lib/db.js')
const multer = require('multer')

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


router.get('/GetOrderfoSL', [authJwt.verifyToken], (req, res) => {
  const store_id = req.user.store_id
  db.query(
    `SELECT orde.user_id, orde.payment_status, orde.is_delivery, orde_detail.orde_id, orde_detail.image, orde_detail.product_id, orde_detail.product_number, orde_detail.store_id
    FROM orde 
      LEFT JOIN orde_detail ON orde_detail.orde_id = orde.orde_id
    WHERE orde_detail.store_id = ${store_id};`,
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
    `SELECT orde.user_id, orde.payment_status, orde.is_delivery, orde_detail.orde_id, orde_detail.product_id, orde_detail.product_number, orde_detail.store_id, orde_detail.image
    FROM orde 
      LEFT JOIN orde_detail ON orde_detail.orde_id = orde.orde_id
    WHERE orde.user_id = ${user_id};`,
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
router.get('/GetOder-forPayment/:orde_id', [authJwt.verifyToken], (req, res) => {
  const orde_id = req.params.orde_id
  db.query(
    `SELECT orde.user_id, orde.payment_status, orde.is_delivery, orde.user_a_id, orde_detail.*
    FROM orde
      LEFT JOIN orde_detail ON orde_detail.orde_id = orde.orde_id WHERE orde.orde_id = ${orde_id};`,
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

// get userAddress for delivery
router.get('/Order/Address', [authJwt.verifyToken], (req, res) => {
  db.query(
    `SELECT * FROM user_address;`,
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
router.post('/create-Order-to-cart/:product_id,:store_id,:image', [authJwt.verifyToken], (req, res) => {
  const product_id = req.params.product_id
  const image = req.params.image
  const store_id = req.params.store_id
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
          `INSERT INTO cart_shop (user_id, payment_status, product_id, product_number, store_id, image) VALUES (${user_id},'0','${product_id}', '1', '${store_id}','${image}');`,
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
router.post('/create-Order-to-Order/:product_id,:product_number,:cart_shop_id,:store_id,:image', [authJwt.verifyToken], (req, res) => {
  const product_id = req.params.product_id
  const product_number = req.params.product_number
  const cart_shop_id = req.params.cart_shop_id
  const store_id = req.params.store_id
  const user_id = req.user.user_id
  const image = req.params.image
  var order_id = 0
  console.log(cart_shop_id)
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
                `INSERT INTO orde_detail (orde_id, product_id, product_number, store_id, image) VALUES (${order_id}, '${product_id}', '${product_number}', ${store_id}, '${image}');`,
                (err) => {
                  if (err) {
                    return res.status(401).send({
                      message: err.message,
                      err
                    })
                  } else {
                    db.query(
                      `delete from cart_shop where cart_shop_id = ${cart_shop_id}`,
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

  const imageUploadPath = "../src/assets";
  var profile_path = "";
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imageUploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`);
      profile_path = `${file.originalname}`;
    },
  });
  const imageUpload = multer({ storage: storage });

// patch payment
router.patch('/payment/:orde_id', imageUpload.single("file"),[authJwt.verifyToken], (req, res) => {
  const user_a_id = req.body.user_a_id
  const orde_id = req.params.orde_id
  db.query(
    `select * from orde where orde_id = ${orde_id}`,
    (err, data) => {
      if (err) {
        return res.status(401).send({
          message: err.message
        })
      } else {
        db.query(
          `UPDATE orde SET payment_status = '${profile_path}', user_a_id = '${user_a_id}' WHERE orde.orde_id = ${orde_id};`,
          (err, result) => {
            if (err) {
              return res.status(401).send({
                message: err.message,
                err
              })
            } else {
              return res.status(201).send({
                message: 'ชำระเงินสำเร็จ',
                product_id: result.insertId
              })
            }
          }
        )
      }
    }
  )
})

// patch deli
router.patch('/delivery/:orde_id',[authJwt.verifyToken], (req, res) => {
  const orde_id = req.params.orde_id
  const is_delivery = req.body.is_delivery
  db.query(
    `select * from orde where orde_id = ${orde_id}`,
    (err, data) => {
      if (err) {
        return res.status(401).send({
          message: err.message
        })
      } else {
        db.query(
          `UPDATE orde SET is_delivery = '${is_delivery}' WHERE orde.orde_id = ${orde_id};`,
          (err, result) => {
            if (err) {
              return res.status(401).send({
                message: err.message,
                err
              })
            } else {
              return res.status(201).send({
                message: 'จัดส่งสำเร็จ',
                product_id: result.insertId
              })
            }
          }
        )
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
