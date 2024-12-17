const mongoose = require('mongoose');

const feesHistorySchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    feeType: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['paid', 'unpaid'],
        required: true,
    },
}, { timestamps: true });

const FeesHistory = mongoose.model('FeesHistory', feesHistorySchema);

module.exports = FeesHistory;
