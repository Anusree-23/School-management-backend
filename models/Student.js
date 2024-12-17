const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    libraryHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LibraryHistory',
    }],
    feesHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeesHistory',
    }],
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
