const cloudinary = require('cloudinary').v2
require('dotenv').config();
cloudinary.config({
  cloud_name: 'dmxtid6zb',
  api_key: '184158523978463',
  api_secret: 'iBUf5678IVQCDDDSLrn01-TS21g'
})

module.exports = cloudinary
