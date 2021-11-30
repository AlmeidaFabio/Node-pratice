import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn("increment")
    post_id:number;

    @Column()
    user_id:number;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name:"user_id" })
    user:User;

    @Column()
    title:string;

    @Column()
    text:string;

    @CreateDateColumn({ default:Date.now() })
    created_at:Date;

    @CreateDateColumn({ default:Date.now() })
    updated_at:Date;
}