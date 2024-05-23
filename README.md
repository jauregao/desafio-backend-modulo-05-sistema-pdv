# API RESTful - PDV

API de frente de caixa desenvolvido em javascript com node.js, recebendo requisições HTTP.

## Informações

- Framework: express
- Bibliotecas:

  - nodemon: ambiente de desenvolvimento;
  - jsonwebtoken: criação de token;
  - bcrypt: criação de hash para senhas;
  - node-postgres: integração com o PostgreSQL;
  - dotenv: carregar variáveis de ambiente;
  - knex: query builder, tem suporte para migração de BD e previne SQL injection utilizando placeholders, além de facilitar a leitura e escrita do código ao abstrair o SQL.
  - cors: habilitação de CORS (cross-origin resourse sharing);

- SGBD: PostgreSQL

## Rotas

- **GET /categoria**
  Lista todas as categorias cadastradas previamente. Retorna um array de objetos com id e nome da categoria.

- **POST /usuario**
  Cadastra um novo usuário no sistema. Recebe no body um objeto com nome, e-mail e senha no seguinte formato, sendo os três dados obrigatórios.

  ```
  {
  	"nome": "Fulana",
  	"email": "fulana@email.com.br",
  	"senha": "fulana123"
  }
  ```

  A senha será criptografada. O e-mail deverá ser único para cada usuário. A validação dos dados ocorre através do middleware específico.

  - **POST /login**
    Efetua o login do usuário no sistema. Recebe no body da requisição um objeto contendo e-mail e a senha cadastrada, ambos obrigatórios.

  ```
  {
  	"email": "fulana@email.com.br",
  	"senha": "fulana123"
  }
  ```

  A validação dos dados será feita através de middleware e será gerado um token de autenticação que deverá ser informado no header das requisições posteriores.

- **GET /usuario**
  Lista dos dados do usuário logado no sistema. Deve ser informado o bearer token no header da requisição HTTP.

  - **PUT /usuario**
    Permite a alteração dos dados do usuário logado. Deve receber no body da requisição um objeto contendo nome, email e senha.

  ```
  {
  	"nome": "Fulana",
  	"email": "fulana@email.com.br",
  	"senha": "fulana123"
  }
  ```

  A nova senha será criptografada. Um middleware validará se o e-mail já existe no cadastro de outro usuário. Deve ser informado o bearer token no header da requisição.

  ## Deploy

  - Link do deploy: https://light-lion-lingerie.cyclic.app/
