const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        status: 'success',
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

exports.updateMe = catchAsync(async (req, res, next) => {
    const { password, role, ...updateData } = req.body;

    if (password) {
        return next(new AppError('This route is not for password updates.', 400));
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
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

exports.deactivateAccount = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { isActive: false });

    res.status(204).json({
        status: 'success',
        data: null
    });
}); 