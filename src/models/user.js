import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    gender: Boolean, 
    roleId: String,
    image: String,
}, { 
    timestamps: true // Tự động thêm createdAt và updatedAt
});

const User = mongoose.model('User', userSchema);

module.exports = User; // Export Model User