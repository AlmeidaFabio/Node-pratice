import { getCustomRepository, Repository } from "typeorm";
import { Post } from "../models/Post";
import { PostsRepository } from "../repositories/PostsRepository";

export class PostServices {
    private postsRepository: Repository<Post>;

    constructor() {
        this.postsRepository = getCustomRepository(PostsRepository)
    }

    async setPost(user_id:string, title:string, text:string) {
        try {
            const post = this.postsRepository.create({
                title,
                text,
                user_id: parseInt(user_id)
            })

            await this.postsRepository.save(post)

            return post;
            
        } catch (error) {
            return error
        }
    }

    async getPosts() {
        try {
            const posts = await this.postsRepository.find({
                relations:["user"]
            });

            return posts;
        } catch (error) {
            return error
        }
    }

    async getPostById(post_id:string) {
        try {
            const post = await this.postsRepository.findOne(post_id, {
                relations:["user"]
            })

            return post;
        } catch (error) {
            return error
        }
    }

    async editPost(post_id:string, title:string, text:string) {
        try {
            await this.postsRepository.update(post_id, {
                title,
                text
            })

            return;
        } catch (error) {
            return error
        }
    }

    async deletePost(post_id:string) {
        try {
            await this.postsRepository.delete(post_id)

            return;
        } catch (error) {
            return error
        }
    }
}