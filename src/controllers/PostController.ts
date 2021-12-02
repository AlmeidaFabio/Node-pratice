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

    async read(request:Request, response:Response) {
        const postServices = new PostServices();
        const { page = 1, limit = 6 } = request.query;

        try {
            const data = await postServices.getPosts(page.toString(), limit.toString());

            return response.status(200).json({
                posts: data.posts,
                pages: Math.ceil(data.count / parseInt(limit.toString())),
                currentPage: parseInt(page.toString())
            })

        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async show(request:Request, response:Response) {
        const postServices = new PostServices();
        const id = request.params.id;

        try {
            if(id) {
                const post = await postServices.getPostById(id)

                return response.status(200).json(post)
            } else {
                return response.status(400).json({error: 'Este Post não existe'})
            }    
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async update(request:Request, response:Response) {
        const postServices = new PostServices();
        const { title, text } = request.body;
        const post_id = request.params.id;
        const token = request.headers.authorization;

        try {
            const loggedUser = jwt.decode(token);
            const post = await postServices.getPostById(post_id);

            if(post.user_id === loggedUser['id']) {
                await postServices.editPost(post_id, title, text)

                return response.status(400).json({success: 'Post editado'})
            } else {
                return response.status(400).json({error: 'Não autorizado'})
            }

        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async delete(request:Request, response:Response) {
        const postServices = new PostServices();
        const post_id = request.params.id;
        const token = request.headers.authorization;

        try {
            const loggedUser = jwt.decode(token);
            const post = await postServices.getPostById(post_id);

            if(post.user_id === loggedUser['id']) {
                await postServices.deletePost(post_id)

                return response.status(400).json({success: 'Post deletado'})
            } else {
                return response.status(400).json({error: 'Não autorizado'})
            }
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}