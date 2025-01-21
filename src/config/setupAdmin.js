const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const createSuperAdmin = async () => {
    try {
        console.log('Checking for existing admin...');
        // Check if super admin exists
        const adminExists = await User.findOne({ role: 'admin' });
        
        if (!adminExists) {
            console.log('No admin found, creating super admin...');
            // Create admin using the User model's save method instead of direct password hashing
            const admin = new User({
                name: 'Super Admin',
                email: 'superadmin@admin.com',
                password: 'admin123456', // Plain password - will be hashed by the User model
                phoneNumber: '9999999999',
                role: 'admin',
                isActive: true
            });

            await admin.save(); // This will trigger the pre-save hook in userModel
            
            console.log('Super Admin created successfully:', admin.email);
        } else {
            console.log('Admin already exists:', adminExists.email);
        }
    } catch (error) {
        console.error('Error creating super admin:', error);
    }
};

module.exports = createSuperAdmin; 