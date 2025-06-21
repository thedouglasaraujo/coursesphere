const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const lessonController = require('../controllers/lessonController');

router.use(auth);

router.post('/', lessonController.create);
router.get('/', lessonController.index);
router.get('/:id', lessonController.show);
router.put('/:id', lessonController.update);
router.delete('/:id', lessonController.destroy);

module.exports = router;
