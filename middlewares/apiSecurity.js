const fs = require('fs')
const dotenv = require('dotnev')
const configData = fs.readSync('.env')
const buf = Buffer.from(configData)
const config = dotenv.parse(buf);

const jwt = require('jsonwebtoken')

module.exports = {
    requireLogin: (req, res, next) => {
        jwt.verify(req.headers.authorization, config.SECRET_KEY, (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: 'invalid_session' })
          }
          req.user = decoded;
          next();
        });
      },
}