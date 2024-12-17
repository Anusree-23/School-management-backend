const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Import cors

dotenv.config();
connectDB();

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/studentRoutes');
const libraryHistoryRoutes = require('./routes/libraryHistoryRoutes');
const feesHistoryRoutes = require('./routes/feesHistoryRoutes');
const ManageStaffRoutes = require('./routes/manageStaffRoutes')

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Apply the CORS middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/libraryHistory', libraryHistoryRoutes);
app.use('/api/feesHistory', feesHistoryRoutes);
app.use('/api/manage-staff',ManageStaffRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
