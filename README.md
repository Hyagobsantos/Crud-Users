## Sobre essa API

*API Criada Para Realização de Teste Tecnico na empresa Contele- utilizando as Tecnologias NodeJs, Postgres, Express, Prisma, Docker*

## Rotas

### Rotas de Usuário

> Parcialmente sem autenticação.

#### BASE URL STAGING - https://contele-avaliacao.herokuapp.com/ 
#### BASE URL DEV - http://localhost:3000/

- Criar Usuário: `/api/v1/user` (POST)
- Encontrar um usuário por `ID`: `/api/v1/users/:user_id:` (GET)
- Editar informações do Usuário: `/api/v1/users/:user_id` (PUT)
- Soft Delete de Usuário Por `ID`: `/api/v1/users/:user_id` (DELETE)
- Hard Delete de Usuário: `/api/v1/users` (DELETE)

### Rota do Swagger


- Rota Documentação Swagger `/docs` (Swagger)

