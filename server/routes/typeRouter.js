const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');


router.post('/', auth, checkRole.min('ADMIN'), typeController.create)
router.get('/', typeController.getAll)


module.exports = router;