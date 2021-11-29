# Praticando conceitos do Node

## Iniciando um projeto node

- Criar o arquivo README na pasta do projeto
- Iniciar o git com o comando git init
- Iniciar o projeto com o comando npm init
- criar o arquivo .gitignore na raiz do projeto
- instalar os pacotes iniciais express, dotenv, etc...
- instalar o typescript, ts-node-dev, types, como depedencias de desenvolvimento
- iniciar o typescript com o comando npx tsc --init
- configurar os scripts no package.json

ex:

```
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
