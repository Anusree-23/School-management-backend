const FeesHistory = require('../models/FeesHistory');
const Student = require('../models/Student');

// Add a new fee record
exports.addFeesHistory = async (req, res) => {
    const { studentId, feeType, amount, paymentDate, status } = req.body;
    try {
        const newFeesHistory = new FeesHistory({
            studentId,
            feeType,
            amount,
            paymentDate,
            status,
        });

        await newFeesHistory.save();

        // Add the record to the student's fees history
        const student = await Student.findById(studentId);
        student.feesHistory.push(newFeesHistory._id);
        await student.save();

        res.status(201).json({
            message: 'Fees history added successfully',
            feesHistory: newFeesHistory,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all fee records for a student
exports.getFeesHistoryByStudent = async (req, res) => {
    const { studentId } = req.params;
    try {
        const feesHistory = await FeesHistory.find({ studentId });
        res.status(200).json(feesHistory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Update a fees history record
exports.updateFeesHistory = async (req, res) => {
    const { id } = req.params; // Fee history record ID
    try {
        const updatedRecord = await FeesHistory.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRecord) {
            return res.status(404).json({ message: 'Fee record not found' });
        }
        res.status(200).json({
            message: 'Fee record updated successfully',
            data: updatedRecord,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a fees history record
exports.deleteFeesHistory = async (req, res) => {
    const { id } = req.params; // Fee history record ID
    try {
        const deletedRecord = await FeesHistory.findByIdAndDelete(id);
        if (!deletedRecord) {
            return res.status(404).json({ message: 'Fee record not found' });
        }
        res.status(200).json({
            message: 'Fee record deleted successfully',
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllFeesHistory = async (req, res) => {
    try {
        const feesHistory = await FeesHistory.find();
        res.status(200).json(feesHistory); // Return all fees history records
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};