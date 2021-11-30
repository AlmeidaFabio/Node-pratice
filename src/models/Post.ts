import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    title:string;

    @Column()
    text:string;

    @CreateDateColumn({ default:Date.now() })
    created_at:Date;

    @CreateDateColumn({ default:Date.now() })
    updated_at:Date;

    @ManyToOne(() => User, user => user.posts)
    user:User;
}