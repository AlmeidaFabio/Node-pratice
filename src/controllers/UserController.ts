import { Request, Response } from "express";
import { UserServices } from "../services/UserServices";
import bcrypt from 'bcrypt'

export class UserController {
    async create(request:Request, response:Response) {
        const userService = new UserServices();

        const { name, lastname, email, password } = request.body;

        try {
            const hash = await bcrypt.hash(password.toString(), 10);

            const data = {
                name,
                lastname,
                email,
                password: hash
            }

            const user = await userService.setUser(data);

            return response.status(201).json(user)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}