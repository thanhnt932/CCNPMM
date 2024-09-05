import express from "express"; //gọi Express
import homeController from "../controller/homeController"; //gọi controller

let router = express.Router();  //khởi tạo Route

let initWebRoutes = (app) => {
    //cách 1:
    router.get('/', (req,res) => {
        return res.send('Nguyen The Thanh');
    });
    //cách 2: gọi hàm trong controller
    router.get('/home', homeController.getHomePage); //url cho trang chủ
    router.get('/about', homeController.getAboutPage); //url cho trang about
    router.get('/crud', homeController.getCRUD); //url get crud
    router.post('/post-crud', homeController.postCRUD); //url post crud
    router.get('/get-crud', homeController.getFindAllCrud); //url find all
    router.get('/edit-crud', homeController.getEditCRUD); //url get edit crud
    router.post('/put-crud', homeController.putCRUD); //url put crud
    router.get('/delete-crud', homeController.deleteCRUD); //url get delete crud

    return app.use("/", router); //url mặc định
}

module.exports = initWebRoutes;