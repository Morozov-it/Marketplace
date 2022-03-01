const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');


router.post('/', auth, checkRole.min('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)


module.exports = router;