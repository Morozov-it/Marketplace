const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const auth = require('../middleware/authMiddleware');


router.post('/', auth, basketController.create)
router.delete('/:id', auth, basketController.remove)
router.get('/', auth, basketController.getAll)


module.exports = router;