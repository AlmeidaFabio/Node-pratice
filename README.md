# Praticando conceitos do Node

## Iniciando um projeto node

- Criar o arquivo README na pasta do projeto
- Iniciar o git com o comando `` git init ``
- Iniciar o projeto com o comando `` npm init ``
- criar o arquivo .gitignore na raiz do projeto
- instalar os pacotes iniciais express, dotenv, etc...
- instalar o typescript, ts-node-dev, types, como depedencias de desenvolvimento
- iniciar o typescript com o comando `` npx tsc --init ``
- configurar os scripts no package.json

ex:

``` scripts
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules ./src/index.ts",
    "build": "tsc",
    "start": "node build/index.js",
    "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js"
  }
```

- configurar as variáveis de ambiente no arquivo .env
- adicionar o que deve ser ignorado no .gitignore como o .env e a pasta node_modules por exemplo.

***neste momento já é interessante fazer o nosso primeiro commit***

- adicione os arquivos com o comando `` git add . ``
- faça o commit com `` git commit -m "first commit" ``

## Testes

### Instalando e configurando o jest

- Instale os pacotes ``npm install jest ts-jest @types/jest -D``
- use o comando ``npx ts-jest config:init``
  será criado o arquivo jest.config.js

```jest.config
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  detectOpenHandles: true
};
```

- Agora vamos ao package.json e configurar o script test
  `` "test": "set NODE_ENV=test& jest --runInBand" ``

Agora já podemos rodar nossos testes com o comando `` npm run test ``

## Iniciando o app

- Crie a pasta src
- Dentro da pasta src vamos criar o arquivo app.ts
  
```App

    import express from 'express'

    const app = express()

    export { app }

```

- Também dentro da pasta src crie o arquivo index.ts
  
```Index
  import 'dotenv/config';
  import { app } from "./app";

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running in ${process.env.BASE_URL}:${process.env.PORT}`)
  })
```

***obs: lembre-se de configurar a porta e a url base nas variáveis de ambiente***

Vamos ver se tudo está funcionando?

``npm run dev``

## Conectando a um Banco de Dados

Usaremos o MYSQL e o typeOrm

- Instale os pacotes ``npm i mysql typeorm reflect-metadata``
- Dentro da pasta src crie uma pasta chamada database
- Dentro da pasta database crie um arquivo index.ts

  ```connection
  import { createConnection } from "typeorm";

  createConnection()
  ```

- No .env adicione as seguinte variáveis de ambiente

```variáveis
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = localhost
TYPEORM_USERNAME = your username
TYPEORM_PASSWORD = your pass
TYPEORM_DATABASE = your database name
TYPEORM_PORT = 3306
TYPEORM_SYNCHRONIZE = false
TYPEORM_LOGGING = false
TYPEORM_ENTITIES = ./src/models/**.ts
TYPEORM_ENTITIES_DIR = ./src/models
TYPEORM_MIGRATIONS = ./src/database/migrations/**.ts
TYPEORM_MIGRATIONS_DIR = ./src/database/migrations
```

- no index da pasta src importe o reflect-metadata e o database

```index
import 'dotenv/config';
import 'reflect-metadata';
import './database';

import { app } from "./app";

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running in ${process.env.BASE_URL}:${process.env.PORT}`)
});
```

- Pronto, agora ja temos tudo configurado e já podemos nos conectar com o banco de dados

### criando uma migration

Com o banco de dados já criado e vázio dê o seguinte comando para criar uma migration para uma tabela de usuários por exemplo

``npx typeorm migration:create -n create_users``

Note que dentro da pasta database será criada a pasta migrations e dentro desta a nossa migration

#### Trabalhando com migrations

O nosso arquivo criado vem pré configurado no seguinte formato

```migration
import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsers1638226054013 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
```

Abaixo um exemplo de uma migration de criação de uma tabela de usuários

```users
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1638226054013 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"users",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"name",
                        type:"varchar(50)",
                    },
                    {
                        name:"lastname",
                        type:"varchar(50)",
                    },
                    {
                        name:"email",
                        type:"varchar(150)",
                        isUnique:true
                    },
                    {
                        name:"password",
                        type:"varchar(200)",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }
}
```

Agora é só rodar o comando ``npm run typeorm migration:run`` e nossa tabela de usuários será criada no banco de dados.

## Models/Entities

Agora vamos aprender a configurar nossos models ou entities

- Na pasta src crie a pasta models ou entities
- Dentro da pasta models crie um arquivo User.ts, ou seja nosso modelo de usuário

````User
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
````

pronto já temos nosso model configurado.

## Repositórios

- Dentro da pasta src crie uma pasta chamada repositories
- Na pasta repositories crie o arquivo UsersRepository.ts

````Repository
import { EntityRepository, Repository } from "typeorm";
import { User } from "../../models/User";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{}
````

## Relações

Para exemplificar como trabalhar com relações no typeorm vamos criar uma nova tabela, posts por exemplo.

- criando a migration
``npx typeorm migration:create -n create_posts``

- configurando a migration

````posts
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
````

- Rode o comando `` npm run typeorm migration:run ``

se tudo ocorreu bem a tabela posts foi criada no banco de dados

- crie o model Post

````post
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
````

- crie o repositório

````postsrepository
import { EntityRepository, Repository } from "typeorm";
import { Post } from "../models/Post";

@EntityRepository(Post)
export class PostsRepository extends Repository<Post>{}
````

Bom, agora vamos supor que o usuário pode ter vários posts, mas cada post pertence apenas a um usuário.

- no model Post adicione

````manyToOne
 @ManyToOne(() => User, user => user.posts)
user: User;
````

````Post
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
````

- no model User adicione

````òneTomany
@OneToMany(() => Post, posts => posts.user)
posts: Post[];
````

````User
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
}
````

Caso a relação seja de um pra um:

- no model Post não seria necessário alterações
- no model User teriámos:

````User
@OneToOne(() => Post)
@JoinColumn()
post: Post;
````

E se fosse uma relação de muitos para muitos?

- No model Post não teriámos alterações
- No User ficaria:

````User
@ManyToMany(() => Post)
@JoinTable()
posts: Post[];
````

Com isso já temos uma pequena noção de como trabalhar com relaçoes usando o typeorm.
