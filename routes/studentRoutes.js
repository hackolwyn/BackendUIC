const express = require("express");
const router = express.Router();
const validateStudent = require("../middleware/validateStudent");
const { getStudents, createStudent, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');

router.route('/').get(getStudents).post(validateStudent, createStudent);
router.route('/:id').get(getStudentById).put(validateStudent, updateStudent).delete(deleteStudent);

module.exports = router;
