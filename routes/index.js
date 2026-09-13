const Router = require('express');
const router = new Router();

const userRoutes = require('./userRoutes')
const carRoutes = require('./carRoutes')

router.use('/auth',userRoutes)
router.use('/cars',carRoutes)

module.exports = router;