import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userController = new UserController();

const router = Router()

router.post('/user', userController.create)

export { router }