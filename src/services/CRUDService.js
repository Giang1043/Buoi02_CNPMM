import bcrypt from 'bcryptjs';
import User from '../models/user'; // Import Model User Mongoose
// BỎ: import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10); 

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => { 
        try {
            // Thay đổi hàm hash cho phù hợp với cách bạn muốn dùng bcrypt
            let hashPassword = await bcrypt.hash(password, salt); // Sử dụng bcrypt.hash để xử lý bất đồng bộ
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = async (data) => { 
    return new Promise(async (resolve, reject) => { 
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);

            // THAY THẾ: db.User.create -> User.create (Mongoose)
            await User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                // Mongoose tự chuyển '0'/'1' sang false/true nếu kiểu là Boolean
                gender: data.gender === '1' ? true : false, 
                roleId: data.roleId
            });
            resolve('OK create a new user successfull');
        } catch (e) {
            reject(e)
        }
    })
}

// lấy tất cả findAll CRUD
let getAllUser = () => {
    return new Promise(async (resolve, reject) => { 
        try {
            // THAY THẾ: db.User.findAll({raw: true}) -> User.find({}) (Mongoose)
            let users = await User.find({}).lean(); // .lean() giúp trả về plain JavaScript objects (tương tự raw: true)
            resolve(users);
        } catch (e) {
            reject(e)
        }
    })
}

// lấy findOne CRUD
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => { 
        try {
            // THAY THẾ: db.User.findOne({where: {id: userId}}) -> User.findById(userId) (Mongoose)
            // Trong MongoDB/Mongoose, ID là '_id'
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

// hàm put CRUD
let updateUser = (data) =>{
    return new Promise(async (resolve, reject) => { 
        try {
            // THAY THẾ: tìm user và dùng .save() -> dùng Mongoose .updateOne()
            let result = await User.updateOne(
                { _id: data.id }, // Điều kiện tìm kiếm (MongoDB dùng _id)
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address
                }
            );

            if(result.modifiedCount > 0){
                 // Lấy danh sách user mới sau khi update
                let allUsers = await getAllUser(); 
                resolve(allUsers);
            } else {
                 resolve([]); // Trả về rỗng nếu không tìm thấy hoặc không có gì thay đổi
            }
           
        } catch (e) {
            reject(e)
        }
    })
}

// hàm xóa user
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => { 
        try {
            // THAY THẾ: tìm user và dùng .destroy() -> dùng Mongoose .findByIdAndDelete(userId)
            await User.findByIdAndDelete(userId); 
            
            resolve(); // Dùng resolve() vì hàm này không cần trả về dữ liệu
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