const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide your phone number']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    // Only hash the password if it's modified
    if (!this.isModified('password')) return next();
    
    // Hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Method to check password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    console.log('Comparing passwords:');
    console.log('Candidate (plain):', candidatePassword);
    console.log('Stored (hashed):', userPassword);
    const isMatch = await bcrypt.compare(candidatePassword, userPassword);
    console.log('Match result:', isMatch);
    return isMatch;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
