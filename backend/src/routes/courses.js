const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const courseController = require('../controllers/courseController');

router.use(auth);

router.post('/', courseController.create);
router.get('/', courseController.index);
router.get('/:id', courseController.show);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.destroy);

router.post('/:id/instructors', courseController.addInstructor);
router.delete('/:id/instructors', courseController.removeInstructor);

module.exports = router;