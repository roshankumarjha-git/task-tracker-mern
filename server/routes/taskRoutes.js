const router = require('express').Router();
const controller = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
router.use(protect);
router.route('/').get(controller.getTasks).post(controller.createTask);
router.route('/:id').get(controller.getTask).put(controller.updateTask).delete(controller.deleteTask);
router.patch('/:id/status', controller.updateStatus);
module.exports = router;
