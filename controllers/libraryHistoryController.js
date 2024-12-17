const LibraryHistory = require('../models/LibraryHistory');
const Student = require('../models/Student');

// Add a new library record
exports.addLibraryHistory = async (req, res) => {
    const { studentId, bookName, borrowDate, returnDate, status } = req.body;
    try {
        const newLibraryHistory = new LibraryHistory({
            studentId,
            bookName,
            borrowDate,
            returnDate,
            status,
        });

        await newLibraryHistory.save();

        // Add the record to the student's library history
        const student = await Student.findById(studentId);
        student.libraryHistory.push(newLibraryHistory._id);
        await student.save();

        res.status(201).json({
            message: 'Library history added successfully',
            libraryHistory: newLibraryHistory,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all library records for a student
exports.getLibraryHistoryByStudent = async (req, res) => {
    const { id } = req.params;  // Ensure you're accessing id not studentId
    try {
        const libraryHistory = await LibraryHistory.find({ studentId: id });
        res.status(200).json(libraryHistory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all library history records (Admin or general view)
exports.getAllLibraryHistory = async (req, res) => {
    try {
        const libraryHistory = await LibraryHistory.find();
        res.status(200).json(libraryHistory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Edit an existing library history record
exports.editLibraryHistory = async (req, res) => {
    const { id } = req.params;  // The record ID to edit
    const { studentId, bookName, borrowDate, returnDate, status } = req.body;
    try {
        const libraryHistory = await LibraryHistory.findById(id);
        if (!libraryHistory) {
            return res.status(404).json({ message: 'Library history not found' });
        }

        // Update the fields
        libraryHistory.studentId = studentId || libraryHistory.studentId;
        libraryHistory.bookName = bookName || libraryHistory.bookName;
        libraryHistory.borrowDate = borrowDate || libraryHistory.borrowDate;
        libraryHistory.returnDate = returnDate || libraryHistory.returnDate;
        libraryHistory.status = status || libraryHistory.status;

        await libraryHistory.save();

        res.status(200).json({
            message: 'Library history updated successfully',
            libraryHistory,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a library history record
exports.deleteLibraryHistory = async (req, res) => {
    const { id } = req.params;  // The record ID to delete
    try {
        const libraryHistory = await LibraryHistory.findById(id);
        if (!libraryHistory) {
            return res.status(404).json({ message: 'Library history not found' });
        }

        await libraryHistory.remove();

        // Optionally remove the history from the student's library history array
        const student = await Student.findById(libraryHistory.studentId);
        student.libraryHistory = student.libraryHistory.filter(
            (historyId) => historyId.toString() !== id
        );
        await student.save();

        res.status(200).json({
            message: 'Library history deleted successfully',
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
