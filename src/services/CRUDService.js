import bcrypt from 'bcryptjs';
import db from '../models/index';
import { where } from 'sequelize';
const salt = bcrypt.genSaltSync(10); //thuat toan hash password
let createNewUser = async(data) => {//ham tao user voi tham so data
    return new Promise(async(resolve, reject) =>{//dung Promise dam bao luon tra ket trong xu ly bat dong bo
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstname: data.firstName,
                lastname: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1'? true:false,
                roleId: Date.roleId
            })
            resolveInclude('OK create a new user successfull');
        }    catch(e){
            reject(e)
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject)=>{//dung Promise dam bao luon tra ket trong xu ly bat dong bo
        try{
            let hashPassword = await bcrypt.hashSync("B4c0/\/", salt);
            resolve(hashPassword);
        }catch(e){
            reject(e)
        }

    })
}
//lay tat cac findAll CRUD
let getAllUser = () => {
    return new Promise(async (resolve, reject)=>{ //dung Promise dam bao luon tra ket trong xu ly bat dong bo
        try{
            let users = db.User.findAll({
                raw: true, //hien thi du lieu goc
            });
            resolve(users);//ham tra ve ket qua
        }catch(e){
            reject(e)
        }
    })
}
//lay findOne CRUD
let getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject) => {//dung Promise dam bao luon tra ket trong xu ly bat dong bo
        try {
            let user = await db.User.findOne({
                where: {id:userId}, //query dieu kien cho tham so
                raw: true
            });
            if(user){
                resolve(user);
            }else{
                resolve([]); //ham tra ve ket qua rong
            }
        }    catch(e){
            reject(e)
        }
    })
}
//ham put CRUD
let updateUser = (data) => {
    return new Promise(async (resolve, reject)=>{//dung Promise dam bao luon tra ket trong xu ly bat dong bo
        try{
            let user = await db.User.findOne({
                where: {id:data.id}//query dieu kien cho tham so
            });
            if(user){
                user.firstName= data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                //lay danh sach user
                let allusers = await db.User.findAll();
                resolve(allusers);
            }else{
                resolve();//ham tra ve ket qua rong
            }
        }    catch(e){
            reject(e)
        }
    })
}
//ham xoa user
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject)=>{ //dung Promise dam bao luon tra ket trong xu ly bat dong bo
        try{
            let user = await db.User.findOne({
                where: {id:userId}
            })
            if(user){
                user.destroy();
            }
            resolve(); //la return
        } catch(e){
            reject(e)
        }
    })
}
module.exports = {//Xuat ra ben ngoai
    createNewUser:createNewUser,
    getAllUser:getAllUser,
    getUserInfoById:getUserInfoById,
    updateUser:updateUser,
    deleteUserById:deleteUserById    
}