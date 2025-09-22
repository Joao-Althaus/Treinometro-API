# Treinometro API: Registro de treinos em Typescript

Autores: João Althaus e Fernando Powzum

Projeto desenvolvido para a materia Desenvolvimento Web/Mobile da Universidade de Passo Fundo (UPF) - 2025.

## Destaques e Funcionalidades

Esta API permite o gerenciamento de usuários, treinos, séries e exercícios, possibilitando registrar e acompanhar treinos de forma estruturada.

### Gerenciamento de Usuarios

- Endpoints para criar, editar, listar e excluir usuarios.

```http
GET     /api/usuarios/       → Lista usuarios
PATCH    /api/usuarios         → Cria novo usuario
PUT     /api/usuarios/:id      → Atualiza usuario existente
DELETE  api/usuario/:id        → Remove usuario
```

### Gerenciamento de Treinos

- Endpoints para criar treinos, excluir, adicionar séries a treinos e consultar treinos por usuário ou intervalo de datas.

```http
GET     /api/treinos/                  → Lista todos os treinos
GET     /api/treinos/:id               → Busca um treino por ID
GET     /api/treinos/usuario/:id       → Lista treinos de um usuário
GET     /api/treinos/usuario/:id/data  → Lista treinos de um usuário em um intervalo de datas
POST    /api/treinos                   → Cria um novo treino
PATCH   /api/treinos/:id/series        → Adiciona uma série a um treino
DELETE  /api/treinos/:id               → Remove um treino
```

### Gerenciamento de Séries

- Endpoints para criar, atualizar, listar e remover séries de treinos.

```http
GET     /api/series            → Lista todas as séries
GET     /api/series/:id        → Busca uma série por ID
GET     /api/series/treino/:id → Lista séries de um treino específico
POST    /api/series            → Cria uma nova série
PATCH   /api/series/:id        → Atualiza uma série existente
DELETE  /api/series/:id        → Remove uma série
```

### Gerenciamento de Exercícios

- Endpoints para criar, atualizar, listar e remover exercícios.

```http
GET     /api/exercicios        → Lista todos os exercícios
GET     /api/exercicios/:id    → Busca um exercício por ID
POST    /api/exercicios        → Cria um novo exercício
PATCH   /api/exercicios/:id    → Atualiza um exercício existente
DELETE  /api/exercicios/:id    → Remove um exercício
```


## Tecnologias Utilizadas
- Linguagem: TypeScript
- Banco de Dados: PostgreSQL
- ORM: TypeORM
- FrameWork: Express

## Como Executar

### 1. Clonar Repo
```
git clone https://github.com/Joao-Althaus/Treinometro-API.git
cd Treinometro-API
```

### 2. Instalar Dependências
```
npm install
```

### 3. Configurar Banco de Dados
- Crie um banco PostgreSQL e configure o arquivo .env com suas credenciais:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=treinometro  # Nome do seu DB

PORT=3000 #Ou outra de sua preferencia
NODE_ENV=development
```

## 📂 Estrutura do Projeto
```text
treinometro/
├── docs/
│   └── treinometro_postman.json
├── src/
│   ├── config/
│   │   └── data-source.ts
│   ├── controllers/
│   │   ├── ExercicioController.ts
│   │   ├── SerieController.ts
│   │   ├── TreinoController.ts
│   │   └── UsuarioController.ts
│   ├── entities/
│   │   ├── Exercicio.ts
│   │   ├── Serie.ts
│   │   ├── Treino.ts
│   │   └── Usuario.ts
│   ├── routes/
│   │   ├── ExercicioRouter.ts
│   │   ├── index.ts
│   │   ├── SerieRouter.ts
│   │   ├── TreinoRouter.ts
│   │   └── UsuarioRouter.ts
│   └── app.ts
├── server.ts
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```
