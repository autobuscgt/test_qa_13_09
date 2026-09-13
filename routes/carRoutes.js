const Router = require('express');
const router = new Router();
const carController = require('../controllers/carController')

router.get('/',carController.getAll);
router.get('/:id',carController.getOne)
router.post('/',carController.create);
router.delete('/:id',carController.delete);
router.put('/:id',carController.update);

module.exports = router;