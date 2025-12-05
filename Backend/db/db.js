const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        console.log('Continuing without database connection...');
        // process.exit(1); // Commented out to allow server to run without DB
    }
};

module.exports = connectToDb;