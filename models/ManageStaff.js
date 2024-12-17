const mongoose = require('mongoose');

// Staff schema definition
const StaffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['Admin', 'Office-staff', 'Librarian'], // Role validation
    },
    email: {
      type: String,
      required: true,
    },
    dateOfJoin: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, // To track if the staff is active or not
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Create an index on the role to improve search performance for staff roles
StaffSchema.index({ role: 1 });

// Model export
module.exports = mongoose.model('Staff', StaffSchema);
