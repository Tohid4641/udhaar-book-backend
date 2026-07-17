const mongoose = require('mongoose');

const connectDB = async () => await mongoose.connect(`${process.env.DATABASE_URI}/udhaar-book`, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})

export default connectDB;