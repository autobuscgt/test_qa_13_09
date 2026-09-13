const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController')

router.get('/all',userController.getAll);
router.get('/all-without-password',userController.getAllWithoutPasswords);
router.post('/register',userController.register);
router.post('/login',userController.login);

module.exports = router;