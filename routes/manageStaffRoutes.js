const express = require('express');
const router = express.Router();
const {deleteStaff,updateStaff,createStaff,getAllStaff} = require('../controllers/ManageStaffController');
const { protect, authorize } = require('../middlewares/auth');

// Routes for staff management
router.get('/', protect, authorize('Admin', 'Office-staff', 'Librarian'),getAllStaff);       // Fetch all staff
router.post('/', protect, authorize('Admin', 'Office-staff', 'Librarian'),createStaff);      // Add a new staff
router.put('/:id', protect, authorize('Admin', 'Office-staff', 'Librarian'),updateStaff);    // Update a staff member
router.delete('/:id', protect, authorize('Admin', 'Office-staff', 'Librarian'),deleteStaff); // Delete a staff member

module.exports = router;
