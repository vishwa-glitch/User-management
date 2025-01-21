const app = require('./app');  // Import the app.js file that contains routes and middleware
const connectDB = require('./config/db'); // Import database connection function
const createSuperAdmin = require('./config/setupAdmin');

// Connect to database
connectDB().then(() => {
    // Create super admin after database connection
    createSuperAdmin();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
