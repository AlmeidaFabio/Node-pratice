import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("avatars")
export class Avatar {
    @PrimaryGeneratedColumn("increment")
    avatar_id:number;

    @Column({ select:false })
    user_id:number;

    @OneToOne(() => User, user => user.avatar)
    @JoinColumn({ name:"user_id" })
    user:User;

    @Column({ select:false })
    filename:string;

    @Column({ select:false })
    originalname:string;

    @Column()
    url:string;

    @CreateDateColumn({ default:Date.now(), select:false })
    created_at:Date;
}