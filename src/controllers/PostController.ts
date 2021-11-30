import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { PostServices } from "../services/PostServices";

export class PostController {
    async create(request:Request, response:Response) {
        const postServices = new PostServices();

        const { title, text } = request.body;

        const token = request.headers.authorization;

        try {
            const loggedUser = jwt.decode(token);

            const post = await postServices.setPost(loggedUser['id'], title, text)

            return response.status(201).json(post)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}