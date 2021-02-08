const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/course')
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})

router.post('/create', upload.single('courseImage'), CourseController.create);
router.get('/all', CourseController.list);
router.get('/titles', CourseController.listCourseTitles);
router.get('/user', CourseController.getUserCourses);
router.put('/:id', upload.single('courseImage'), CourseController.update);
router.get('/chef', CourseController.getChefCourses);
router.put('/:id/updateRating', CourseController.updateRating);
router.get('/:id', CourseController.getSingle);
router.get('/instance/:instanceId', CourseController.getInstance);
router.get('/ingredients/:id', CourseController.getIngredients);
router.get('/isUserCourse/:instanceId', CourseController.isUserCourse);
router.get('/isChefCourse/:courseId', CourseController.isChefCourse);
router.post('/:id/rating', CourseController.addRating);
router.put('/:id/rating', CourseController.removeRating);
router.delete('/:id', CourseController.remove);

module.exports = router;
