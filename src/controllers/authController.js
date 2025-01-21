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

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    // 2) Find user and explicitly select password
    const user = await User.findOne({ email, isActive: true }).select('+password');
    
    console.log('Login attempt for:', email);
    console.log('User found:', !!user);

    if (!user) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3) Verify password
    const isPasswordCorrect = await user.correctPassword(password, user.password);
    console.log('Password check result:', isPasswordCorrect);

    if (!isPasswordCorrect) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 4) If everything ok, send token
    const token = generateToken(user._id);

    // Remove password from output
    user.password = undefined;

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
});
