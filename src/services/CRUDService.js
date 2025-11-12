import bcrypt from 'bcryptjs';
import User from '../models/user'; // Import Model User Mongoose (Giả định nằm ở '../models/user')
// BỎ: import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10); 

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => { 
        try {
            // Sử dụng bcrypt.hash để xử lý bất đồng bộ
            let hashPassword = await bcrypt.hash(password, salt); 
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

// HÀM TẠO USER (CREATE)
let createNewUser = async (data) => { 
    return new Promise(async (resolve, reject) => { 
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);

            // SỬA: Thay thế db.User.create -> User.create (Mongoose)
            await User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                // Mongoose
                gender: data.gender === '1' ? true : false, 
                roleId: data.roleId
            });
            resolve('OK create a new user successfull');
        } catch (e) {
            reject(e)
        }
    })
}

// HÀM LẤY TẤT CẢ USER (READ ALL)
let getAllUser = () => {
    return new Promise(async (resolve, reject) => { 
        try {
            // SỬA: Thay thế db.User.findAll() -> User.find({})
            // .lean() giúp trả về object thuần JavaScript (tương tự raw: true của Sequelize)
            let users = await User.find({}).lean(); 
            resolve(users);
        } catch (e) {
            reject(e)
        }
    })
}

// HÀM LẤY USER THEO ID (READ ONE)
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => { 
        try {
            // SỬA: Thay thế db.User.findOne({where: {id: userId}}) -> User.findById(userId)
            // Tìm kiếm bằng ID (MongoDB dùng _id)
            let user = await User.findById(userId).lean(); 
            
            if(user){
                resolve(user);
            }else{
                resolve({});
            }
        } catch (e) {
            reject(e)
        }
    })
}

// HÀM CẬP NHẬT USER (UPDATE)
let updateUser = (data) =>{
    return new Promise(async (resolve, reject) => { 
        try {
            // SỬA: Thay thế logic Sequelize bằng User.updateOne
            let result = await User.updateOne(
                { _id: data.id }, // Điều kiện tìm kiếm (MongoDB dùng _id)
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    // Không cần cập nhật password, email, roleID
                }
            );

            // Kiểm tra xem có bản ghi nào được chỉnh sửa không
            if(result.modifiedCount > 0 || result.matchedCount > 0){
                // Lấy danh sách user mới sau khi update
                let allUsers = await getAllUser(); 
                resolve(allUsers);
            } else {
                 // Nếu không tìm thấy hoặc không có gì thay đổi, vẫn trả về danh sách cũ
                 let allUsers = await getAllUser(); 
                 resolve(allUsers);
            }
        } catch (e) {
            reject(e)
        }
    })
}

// HÀM XÓA USER (DELETE)
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => { 
        try {
            // SỬA: Thay thế .destroy() -> User.findByIdAndDelete(userId)
            await User.findByIdAndDelete(userId); 
            
            resolve(); // Trả về thành công
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = { 
    createNewUser:createNewUser,
    getAllUser: getAllUser,
    getUserInfoById:getUserInfoById,
    updateUser: updateUser,
    deleteUserById: deleteUserById
}