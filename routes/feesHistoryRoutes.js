const express = require('express');
const router = express.Router();
const { addFeesHistory, getFeesHistoryByStudent, getAllFeesHistory, updateFeesHistory, deleteFeesHistory } = require('../controllers/feesHistoryController');
const { protect, authorize } = require('../middlewares/auth');

// Route to add a fees history
router.post('/', protect, authorize('Admin', 'Office-staff', 'Librarian'), addFeesHistory);

// Route to get all fees history records
router.get('/', protect, authorize('Admin', 'Office-staff', 'Librarian'), getAllFeesHistory);

// Route to get fees history by student ID
router.get('/:studentId', protect, authorize('Admin', 'Office-staff', 'Librarian'), getFeesHistoryByStudent);

// Route to update a fees history record
router.put('/:id', protect, authorize('Admin', 'Office-staff', 'Librarian'), updateFeesHistory);

// Route to delete a fees history record
router.delete('/:id', protect, authorize('Admin', 'Office-staff', 'Librarian'), deleteFeesHistory);

module.exports = router;
