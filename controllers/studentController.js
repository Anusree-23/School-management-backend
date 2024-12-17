const Student = require('../models/Student');

exports.addStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(200).json({
            message: 'Student added successfully',  // Added success message
            data:student
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id).populate('libraryHistory').populate('feesHistory');
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update student details
exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, class: studentClass } = req.body;
    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, { name, class: studentClass }, { new: true });
        if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({
            message: 'Student updated successfully',
            student: updatedStudent
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};