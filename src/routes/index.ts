import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { PostController } from "../controllers/PostController";
import { UserController } from "../controllers/UserController";
import { Authorize } from "../middlewares/Authorize";

const userController = new UserController();
const authController = new AuthController();
const authorization = new Authorize();
const postController = new PostController();

const router = Router()

//Autenticação
router.post('/login', authController.login)

//users
router.post('/user', userController.create)

//posts
router.post('/post', authorization.authorized, postController.create)

export { router }