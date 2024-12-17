// models/LibraryHistory.js

const mongoose = require('mongoose');

const libraryHistorySchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    bookName: {
        type: String,
        required: true,
    },
    borrowDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['borrowed', 'returned'],
        required: true,
    },
}, { timestamps: true });

const LibraryHistory = mongoose.model('LibraryHistory', libraryHistorySchema);

module.exports = LibraryHistory;
