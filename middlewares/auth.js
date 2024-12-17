const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect middleware to check if the user is authenticated (JWT verification)
const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    
    // Check if the token exists and starts with "Bearer "
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        // Verify the token using JWT_SECRET
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        
        // Attach the user data to the request object, excluding the password
        req.user = await User.findById(decoded.id).select('-password');
        
        // Check if the user exists
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
        }

        console.log('Authenticated User:', req.user);  // Log the user object for debugging
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'Unauthorized - Token failed' });
    }
};

// Authorization middleware to check if the user has the required role(s)
const authorize = (...roles) => {
    return (req, res, next) => {
        // Check if the user's role is allowed to access the route
        if (!roles.includes(req.user.role)) {
            console.log('Access Denied for Role:', req.user.role);  // Log the user's role for debugging
            return res.status(403).json({ message: 'Forbidden - Access denied' });
        }

        next();  // User is authorized, proceed to the next middleware or route handler
    };
};

module.exports = { protect, authorize };
