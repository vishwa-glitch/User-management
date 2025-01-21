const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Get all users (admin only)
exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password');
    
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
});

// Get user details by ID (admin only)
exports.getUserById = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

// Update user status (admin only)
exports.updateUserStatus = catchAsync(async (req, res, next) => {
    const { isActive } = req.body;
    
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive },
        { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

// Get admin dashboard stats
exports.getDashboardStats = catchAsync(async (req, res) => {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const activeUsers = await User.countDocuments({ role: 'user', isActive: true });
    const inactiveUsers = await User.countDocuments({ role: 'user', isActive: false });

    res.status(200).json({
        status: 'success',
        data: {
            totalUsers,
            activeUsers,
            inactiveUsers
        }
    });
});

exports.createAdmin = catchAsync(async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;

    const admin = await User.create({
        name,
        email,
        password,
        phoneNumber,
        role: 'admin'
    });

    res.status(201).json({
        status: 'success',
        data: {
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                phoneNumber: admin.phoneNumber,
                role: admin.role
            }
        }
    });
}); 