const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken(req, res, next) {
        if(!req.headers.authorization) {
            console.log(req.headers.x-access-token)
            console.log('no key');
            return res.status(401).send('Unauthorized request')
        }
        let token = req.headers.authorization.split(' ')[1]
        if(token === 'null') {
            console.log('no token');
          return res.status(401).send('Unauthorized request')    
        }
        let payload = jwt.verify(token, 'secretKey')
        if(!payload) {
            console.log('no payload');
          return res.status(401).send('Unauthorized request')    
        }
        req.userId = payload.subject
        next()
      }
}