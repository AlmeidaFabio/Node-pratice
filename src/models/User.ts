import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Avatar } from "./Avatar";
import { Post } from "./Post";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    name:string;

    @Column()
    lastname:string;

    @Column({ unique:true })
    email:string;

    @Column({select:false})
    password:string;

    @OneToMany(() => Post, posts => posts.user)
    posts: Post[];

    @OneToOne(() => Avatar, avatar => avatar.user)
    avatar:Avatar;
}