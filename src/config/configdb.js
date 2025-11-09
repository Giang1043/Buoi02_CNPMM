import mongoose from 'mongoose';

// Lấy chuỗi kết nối từ biến môi trường (Ví dụ: MONGO_URI=mongodb://localhost:27017/my_user_db)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/node_fulltask_mongo';

let connectDB = async () => {
    try {
        // Sử dụng mongoose.connect() để kết nối
        await mongoose.connect(MONGO_URI);
        console.log('Connection to MongoDB has been established successfully.');
    } catch (error) {
        // SequelizeAccessDeniedError được thay thế bằng lỗi của Mongoose
        console.error('Unable to connect to the MongoDB database:', error);
        // Tùy chọn: Dừng ứng dụng nếu không kết nối được database
        // process.exit(1); 
    }
}

module.exports = connectDB;