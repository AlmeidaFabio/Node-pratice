import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPosts1638229610178 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "posts",
                columns: [
                    {
                        name:"post_id",
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
                        name:"title",
                        type:"varchar"
                    },
                    {
                        name:"text",
                        type:"varchar"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    },
                    {
                        name:"updated_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ],
                foreignKeys: [
                   {
                    name:"FKUserPosts",
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
        await queryRunner.dropTable("posts")
    }

}
