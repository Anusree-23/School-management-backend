const Staff = require('../models/ManageStaff');

// Create a new staff member
const createStaff = async (req, res) => {
  try {
    const { name, role, email, dateOfJoin } = req.body;
    const newStaff = new Staff({ name, role, email, dateOfJoin });
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(400).json({ message: 'Error creating staff', error: error.message });
  }
};

// Get all staff members
const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff', error: error.message });
  }
};

// Get a specific staff member by ID
const getStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff', error: error.message });
  }
};

// Update staff member details
const updateStaff = async (req, res) => {
  const { id } = req.params;
  const { name, role, email, dateOfJoin } = req.body;
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      { name, role, email, dateOfJoin },
      { new: true }
    );
    if (!updatedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(400).json({ message: 'Error updating staff', error: error.message });
  }
};

// Delete a staff member
const deleteStaff = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStaff = await Staff.findByIdAndDelete(id);
    if (!deletedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting staff', error: error.message });
  }
};

module.exports = {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
};
