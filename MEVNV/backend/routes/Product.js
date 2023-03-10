const express = require('express')
const router = express.Router()
const authJwt = require('../middleware/authJwt')
const db = require('../lib/db.js')
const multer = require('multer')

// search product
router.get('/product/search', (req, res) => {
  const product_name = req.query.product_name
  const product_type_name = req.query.product_type_name
  db.query(
    `SELECT product.*, product_type.*, product.product_name
    FROM product 
      LEFT JOIN product_type ON product.py_id = product_type.product_type_id
    WHERE product.product_name LIKE '%${product_name}%' AND product_type.product_type_name LIKE '%${product_type_name}%';`,
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

// get Product version get img
// router.get('/product', (req, res) => {
//   db.query(
//     `select product.*, db_image.image from product LEFT JOIN db_image ON db_image.product_id = product.product_id where product_show = 1 AND db_image.default_image = 1;`,
//     (err, data) => {
//       if (err) {
//         return res.status(401).send({
//           message: err.message
//         })
//       } else {
//         return res.status(200).json({
//           data: data,
//           total: data.length
//         })
//       }
//     }
//   )
// })
// get Product all
router.get('/product', (req, res) => {
  db.query(
    `select * from product`,
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
// get Product By ID
router.get('/product/:id', (req, res) => {
  const product_id = req.params.id
  db.query(
    `select * from product where product_id = ${product_id};`,
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

// get Product By Store ID
router.get('/product/store/:id', (req, res) => {
  const id = req.params.id
  db.query(
    `select product.*, db_image.image from product LEFT JOIN db_image ON db_image.product_id = product.product_id where product.store_id = ${id} AND db_image.default_image = 1 ;`,
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

// get Product By Product ID
router.get('/product-get-product-id/:id', (req, res) => {
  const id = req.params.id
  db.query(
    `select * from product where product.product_id = ${id};`,
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

// get Product Detail
router.get('/product/detail/:id', (req, res) => {
  db.query(`select * from product_detail where product_id = ${req.params.id}`, (err, data) => {
    if (err) {
      return res.status(401).json({
        message: err.message
      })
    } else {
      return res.status(200).json(data)
    }
  })

})

// get product by store id
router.get('/product-by-storeID', [authJwt.verifyToken], (req, res) => {
  const store_id = req.user.store_id
  db.query(`select * from product where store_id = '${store_id}';`, (err, data) => {
    if (err) {
      return res.status(400).send({
        code: err.code,
        message: err.message
      })
    } else {
      if (data.length === 0) {
        return res.status(404).send({
          message: 'store_id not found'
        })
      }
      return res.status(200).send({
        data
      })
    }
  })
})


//upload product image old nop
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


// create Product
router.post('/product', imageUpload.single("file"),[authJwt.verifyToken, authJwt.isStore], (req, res) => {
  const user_id = req.user.user_id
  const product_type_id = req.body.product_type_id
  const product_name = req.body.product_name
  const product_price = req.body.product_price
  const product_number = req.body.product_number
  const description = req.body.description
  const store_id = req.user.store_id
  db.query(
    `select * from user_role where user_id = ${user_id} and role_id = 2;`,
    (err, data) => {
      if (err) {
        return res.status(401).send({
          message: err.message
        })
      } else {
        db.query(
          `insert into product (py_id, product_name, product_price, store_id, product_number, description, image, post_date) values 
          (${product_type_id},'${product_name}', '${product_price}', ${store_id}, '${product_number}', '${description}', '${profile_path}', now());`,
          (err, result) => {
            if (err) {
              return res.status(401).send({
                message: err.message,
                err
              })
            } else {
              return res.status(201).send({
                message: 'insert successfully',
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
    const product_detail = req.body.product_detail
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
              `insert into product_detail (product_id, pd_description) values (${product_id}, '${product_detail}');`,
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
    const py_id = req.body.py_id
    const product_name = req.body.product_name
    const product_price = req.body.product_price
    const product_number = req.body.product_number
    const description = req.body.description
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
              `update product set py_id = '${py_id}', product_name = '${product_name}', product_price = '${product_price}', product_number = ${product_number}, description = '${description}' where product_id = ${product_id}`,
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
              `update product_detail set pd_description = '${pd_description}' where product_id = ${product_id};`,
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

// Product Show
router.delete(
  '/product/show/:id',
  [authJwt.verifyToken, authJwt.isStore],
  (req, res) => {
    const product_id = req.params.id
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
              `update product set product_show = 0 where product_id = ${product_id}`,
              (err, result) => {
                if (err) {
                  return res.status(401).json({
                    message: err.message
                  })
                } else {
                  return res.status(200).json({
                    message: "Updated product successfully"
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

// Product Show
router.patch(
  '/product/show/:id',
  [authJwt.verifyToken, authJwt.isStore],
  (req, res) => {
    const product_id = req.params.id
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
              `update product set product_show = 1 where product_id = ${product_id}`,
              (err, result) => {
                if (err) {
                  return res.status(401).json({
                    message: err.message
                  })
                } else {
                  return res.status(200).json({
                    message: "Updated product successfully"
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
