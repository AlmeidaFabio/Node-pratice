import { getCustomRepository, Repository } from "typeorm";
import { User } from "../models/User";
import { UsersRepository } from "../repositories/UsersRepository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthService {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async login(email: string, password: string) {
        try {
            const user = await this.usersRepository.findOne({ email }, {
                select:["id", "email", "password"]
            });

            if(!user) {
                return {error: 'User does not exists!'};
            }

            if(!await bcrypt.compare(password, user.password)) {
                return {error: 'Invalid password!'};
            }

            const token = jwt.sign({ id:user.id }, process.env.SECRET, {
                expiresIn:86400
            });

            return {id:user.id, token};
        } catch (error) {
            return error;
        }
    }
}