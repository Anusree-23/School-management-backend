const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const { addStudent, getStudents,getStudentById,updateStudent,deleteStudent } = require('../controllers/studentController');

router.post('/', protect, authorize('Admin', 'Office-staff', 'Librarian'), addStudent);
router.get('/', protect, authorize('Admin', 'Office-staff', 'Librarian'), getStudents);
router.get('/:id', protect, authorize('Admin', 'Office-staff', 'Librarian'), getStudentById);
router.put('/:id', protect, authorize('Admin', 'Office-staff'), updateStudent);
router.delete('/:studentId', protect, authorize('Admin', 'Office-staff'), deleteStudent);

module.exports = router;
