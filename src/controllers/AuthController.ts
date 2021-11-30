import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
    async login(request:Request, response:Response) {
        const auth = new AuthService();

        const { email, password } = request.body;

        try {
            const loggedUser = await auth.login(email, password.toString());

            return response.status(200).json(loggedUser);
        } catch (error) {
            return response.status(400).json(error);
        }
    }
}