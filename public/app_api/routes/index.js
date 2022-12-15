var express = require('express');
var router = express.Router();
const jwt = require();
const auth = jwt({
    secret:process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ["HS256"],
});
const authController = require('../controllers/authentication')
const tripsController = require('../controllers/trips');
/* GET home page. */
router 
    .route('/login')
    .post(authController.login);
router 
    .route('/register')
    .post(authController.register);
    
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip);
    
module.exports = router;
