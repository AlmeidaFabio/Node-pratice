import { getCustomRepository, Repository } from "typeorm";
import { Avatar } from "../models/Avatar";
import { AvatarsRepository } from "../repositories/AvatarsRepository";
import { ImageTypes } from "../types/ImageTypes";

export class UploadServices {
    private avatarsRepository: Repository<Avatar>;

    constructor() {
        this.avatarsRepository = getCustomRepository(AvatarsRepository)
    }

    async uploadAvatar(img:ImageTypes) {
        try {
            const avatar = this.avatarsRepository.create({
                originalname: img.originalname,
                filename: img.filename,
                url: img.url,
                user_id: img.user_id
            }); 

            await this.avatarsRepository.save(avatar);

            return avatar;
        } catch (error) {
            return error;
        }
    }

    async findAvatarByUserId(userId:string) {
        try {
            const avatar = this.avatarsRepository.find({
                where:[{
                    user_id: parseInt(userId)
                }]
            })

            return avatar;

        } catch (error) {
            return error
        }
    }

    async deleteAvatar(avatar_id: string) {
        try {
            await this.avatarsRepository.delete(avatar_id);
            return;
        } catch (error) {
            return error
        }
    }
}