const express = require('express');
const { 
        getAllCourses, 
        getCourse,
        deleteCourse
      } = require('../controllers/courseControllers');

const router = express.Router();

router.get('/courses', getAllCourses);
router.get('/course/:id', getCourse);

router.delete('/course/:id', deleteCourse);

module.exports = {
    routes: router
}
