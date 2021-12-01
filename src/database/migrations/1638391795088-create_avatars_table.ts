import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAvatarsTable1638391795088 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"avatars",
                columns: [
                    {
                        name:"avatar_id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"user_id",
                        type:"int"
                    },
                    {
                        name:"filename",
                        type:"varchar"
                    },
                    {
                        name:"originalname",
                        type:"varchar"
                    },
                    {
                        name:"url",
                        type:"varchar"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKUserAvatar",
                        columnNames:["user_id"],
                        referencedColumnNames:["id"],
                        referencedTableName:"users",
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("avatars");
    }

}
