import { getCustomRepository, Repository } from "typeorm";
import { User } from "../models/User";
import { UsersRepository } from "../repositories/UsersRepository";
import { UserTypes } from "../types/UserTypes";

export class UserServices {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }
    
    async setUser(data:UserTypes) {
        try {
            const user = this.usersRepository.create({
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: data.password
            })

            await this.usersRepository.save(user);

            return user;
            
        } catch (error) {
            return error
        }
    }
}