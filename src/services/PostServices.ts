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
}