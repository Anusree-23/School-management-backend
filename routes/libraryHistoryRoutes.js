const express = require('express');
const router = express.Router();
const {
    addLibraryHistory,
    getLibraryHistoryByStudent,
    getAllLibraryHistory,
    editLibraryHistory,
    deleteLibraryHistory
} = require('../controllers/libraryHistoryController');
const { protect, authorize } = require('../middlewares/auth');

// Route to add library history
router.post('/', protect, authorize('Admin', 'Office-staff', 'Librarian'), addLibraryHistory);

// Route to get library history by student ID
router.get('/:id', protect, authorize('Admin', 'Office-staff', 'Librarian'), getLibraryHistoryByStudent);

// Route to get all library history records (Admin or General View)
router.get('/', protect, authorize('Admin', 'Office-staff', 'Librarian'), getAllLibraryHistory);

// Route to edit a specific library history record
router.put('/:id', protect, authorize('Admin', 'Office-staff', 'Librarian'), editLibraryHistory);

// Route to delete a specific library history record
router.delete('/:studentId', protect, authorize('Admin', 'Office-staff', 'Librarian'), deleteLibraryHistory);

module.exports = router;
