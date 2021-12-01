import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { PostController } from "../controllers/PostController";
import { UserController } from "../controllers/UserController";
import { Authorize } from "../middlewares/Authorize";
import { UploadController } from "../controllers/UploadController";
import multer from 'multer'
import { uploadAvatar } from '../middlewares/Upload'


const userController = new UserController();
const authController = new AuthController();
const authorization = new Authorize();
const postController = new PostController();
const uploadController = new UploadController();

const router = Router()

//Autenticação
router.post('/login', authController.login)

//users
router.post('/user', userController.create)
router.post('/user/avatar', authorization.authorized, multer(uploadAvatar).single("avatar"), uploadController.uploadFile)

//posts
router.post('/post', authorization.authorized, postController.create)
router.get('/posts', postController.read)
router.get('/post/:id', postController.show)
router.put('/post/:id', authorization.authorized, postController.update)
router.delete('/post/:id', authorization.authorized, postController.delete)

export { router }