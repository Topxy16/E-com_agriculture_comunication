const express = require('express')
const router = express.Router()
const authJwt = require('../middleware/authJwt')
const db = require('../lib/db.js')
const verifyForm = require('../middleware/verifyForm')

router.get('/useradd', [authJwt.verifyToken], (req, res) => {
  const user_id = req.user.user_id
  db.query(
    `select * from user_address where user_id = ${user_id}`,
    (err, data) => {
      if (err) {
        return res.status(400).send({
          code: err.code,
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

router.get('/useradd/:user_a_id', [authJwt.verifyToken], (req, res) => {
  const user_a_id = req.params.user_a_id
  db.query(
    `select * from user_address where user_a_id = ${user_a_id}`,
    (err, data) => {
      if (err) {
        return res.status(400).send({
          code: err.code,
          message: err.message
        })
      } else {
        if (data.length === 0) {
          return res.status(404).send({
            message: 'user_address_id not found'
          })
        }
        return res.status(200).send({
          data,
        })
      }
    }
  )
})

//address for profile
router.get('/useraddinfor/:user_id', [authJwt.verifyToken], (req, res) => {
  const user_id = req.user.user_id
  db.query(
    `select * from user_address where user_id = ${user_id}`,
    (err, data) => {
      if (err) {
        return res.status(400).send({
          code: err.code,
          message: err.message
        })
      } else {
        if (data.length === 0) {
          return res.status(404).send({
            message: 'user_id not found'
          })
        }
        return res.status(200).send({
          data,
        })
      }
    }
  )
})

router.post(
  '/useradd',
  [authJwt.verifyToken],
  (req, res) => {
    const user_id = req.user.user_id
    const address = req.body.address
    const sub_district = req.body.sub_district
    const district = req.body.district
    const province = req.body.province
    const tel = req.body.tel
    const zip_code = req.body.zip_code
    db.query(
      `INSERT INTO user_address (user_id, address, sub_district, district, province, tel, zip_code) VALUES 
      ('${user_id}','${address}', '${sub_district}', '${district}', '${province}', '${tel}', '${zip_code}');`,
      (err, result) => {
        if (err) {
          return res.status(400).send({
            code: err.code,
            message: err.message
          })
        } else {
          return res.status(201).send({
            message: 'insert succeeded',
            user_address_id: parseInt(result.insertId)
          })
        }
      }
    )
  }
)

router.patch(
  '/useradd/:user_address_id',
  [authJwt.verifyToken],
  (req, res) => {
    const user_a_id = req.params.user_address_id
  
    const user_id = req.user.user_id
    const address = req.body.address
    const sub_district = req.body.sub_district
    const district = req.body.district
    const province = req.body.province
    const tel = req.body.tel
    const zip_code = req.body.zip_code
    db.query(
      `select * from user_address where user_a_id = ${user_a_id};`,
      (err, result) => {
        if (err) {
          return res.status(400).send({
            code: err.code,
            message: err.message
          })
        } else {
          db.query(
            `update user_address set address = '${address}', sub_district = '${sub_district}',
   district = '${district}', province = '${province}', tel = ${tel} , zip_code = ${zip_code}
   where user_a_id = ${user_a_id} AND user_id = ${user_id};`,
            (err, result) => {
              if (err) {
                return res.status(400).send({
                  code: err.code,
                  message: err.message
                })
              } else {
                return res.status(200).send({
                  message: 'update succeed'
                })
              }
            }
          )
        }
      }
    )
  }
)

router.delete(
  '/useradd/:user_address_id',
  [authJwt.verifyToken, verifyForm.Useradd_del],
  (req, res) => {
    const user_a_id = req.params.user_address_id
    db.query(
      `select * from user_address where user_a_id = ${user_a_id};`,
      (err, result) => {
        if (err) {
          return res.status(400).send({
            code: err.code,
            message: err.message
          })
        } else {
          if (result.length === 0) {
            return res.status(404).send({
              message: 'user_address_id not found'
            })
          }
          db.query(`delete from user_address where user_a_id = ${user_a_id}`, (err, result) => {
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
          })
        }
      }
    )
  }
)

module.exports = router
