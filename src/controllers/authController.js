const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const generateToken = require('../utils/generateToken');

// Register a new user
exports.register = catchAsync(async (req, res, next) => {
    const { name, email, password, phoneNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new AppError('Email already registered', 400));
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
        phoneNumber
    });

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber
            }
        }
    });
});

// Login existing user
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    // Find user
    const user = await User.findOne({ email, isActive: true }).select('+password');
    
    console.log('Login attempt for:', email);
    
    // Check if user exists and password is correct
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.status(200).json({
        status: 'success',
        token,
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role
            }
        }
    });
});
