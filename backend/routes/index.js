const router = require("express").Router();
const homeController = require('../Controller/home')
const userController = require('../Controller/user')
const urlController = require('../Controller/url')
const verifyToken = require("../Config/jwt_middleware")

router.get('/', homeController.home);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/shorten',  urlController.createShortUrl);
router.get('/:shortURL', verifyToken,urlController.redirectToOriginalUrl);


module.exports = router;