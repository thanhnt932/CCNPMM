import db from '../models/index';
import CRUDService from '../services/CRUDService'

//hàm getHomePage
let getHomePage = async(req, res) => {
    //return res.send('Nguyen The Thanh');
    try{
        let data = await db.User.findAll(); //lay du lieu tu models.index
        console.log('..........................');
        console.log(data);
        console.log('..........................');
        return res.render('homepage.ejs',{
            data: JSON.stringify(data) //tra du lieu data ve view
        });
    }catch(e){
        console.log(e);
    }
}
//hàm getAbout
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
//ham CRUD
let getCRUD = (req, res)=>{
    return res.render('crud.ejs');
}
//ham findAll CRUD
let getFindAllCrud = async(req, res)=>{
    let data = await CRUDService.getAllUser(); 
    // console.log('--------------------------');
    // console.log(data);
    // console.log('--------------------------');
    // return res.send('FindAll crud to server');
    return res.render('users/findAllUser.ejs',{
        datalist: data
    }); //goi view va truyen du lieu ra view
}
//ham post CRUD
let postCRUD = async (req, res) => {
    let messsage = await CRUDService.createNewUser(req.body); //goi service
    console.log(messsage);
    return res.send('Post crud to server');

}
//ham lay du lieu de edit
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('users/editUser.ejs',{
            data: userData
        });
    }else{
        return res.send('Khong lay duoc id');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let data1 = await CRUDService.updateUser(data);
    return res.render('users/findAllUser.ejs', {
        datalist:data1
    });

}

let deleteCRUD = async(req, res) => {
    let id = req.query.id;
    if(id){
        await CRUDService.deleteUserById(id);
        return res.send('Deleted!');
    }else{
        return res.send('Not find user')
    }
}

// object: {
//     key: '',
//     value: ''
// }
//export ra object
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    getFindAllCrud:getFindAllCrud,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD
}