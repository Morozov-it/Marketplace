const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const auth = require('../middleware/authMiddleware');
const empty = require('../middleware/checkEmptyMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');


router.post('/', auth, checkRole.min('ADMIN'), empty, brandController.create)
router.get('/', brandController.getAll)


module.exports = router;