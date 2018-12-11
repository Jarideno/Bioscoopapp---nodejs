const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ApiError = require('../models/ApiError');

module.exports = {
    register(req, res, next){
    let userData = req.body
    let user = new User(userData)
    User.create(user, (err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        let payload = {subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    })
  },
  
  login(req, res){
    let userData = req.body
    User.findOne({username: userData.username}, (err, user) => {
      if (err) {
        console.log(err)    
      } else {
        if (!user) {
          res.status(401).send('Invalid username or password')
        } else 
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid username or password')
        } else {
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      }
    })
  }
}