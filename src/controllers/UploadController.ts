import { Request, Response } from "express";
import { UploadServices } from "../services/UploadServices";
import jwt from 'jsonwebtoken';

export class UploadController {
    async uploadFile(request:Request, response:Response) {
        const uploadServices = new UploadServices();
        const { originalname, filename, fieldname } = request.file;
        const token = request.headers.authorization;

        try {
            const loggedUser = jwt.decode(token);

            const img = {
                originalname,
                filename,
                url: `${process.env.BASE_URL}:${process.env.PORT}/uploads/${fieldname}s/${filename}`,
                user_id: parseInt(loggedUser['id'])
            }

            if(request.file.fieldname === 'avatar') {
                const avatar = await uploadServices.findAvatarByUserId(loggedUser['id']);

                if(avatar.length > 0) {
                    const avatarId = avatar.map(item => item.avatar_id);

                    await uploadServices.deleteAvatar(avatarId.toString());

                    const newAvatar = await uploadServices.uploadAvatar(img);

                    return response.status(201).json(newAvatar);

                } else {
                    const newAvatar = await uploadServices.uploadAvatar(img);

                    return response.status(201).json(newAvatar);
                }
            }

        } catch (error) {
            return response.status(400).json(error);
        }
    }
}