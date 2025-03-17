# Product Management CRUD

Um sistema  de gerenciamento de produtos com funcionalidades CRUD (Create, Read, Update, Delete), desenvolvido como parte de uma avaliação técnica. 

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js, React Hook Form, Zod, TanStack Query, PrimeReact
- **Backend**: NestJS, Prisma ORM
- **Banco de Dados**: PostgreSQL (via Docker)

## 📷 Screenshots

### 1. Tabela de gerenciamento de produtos
![image](https://github.com/user-attachments/assets/ef4f1769-0f41-4bd6-bef7-d5a48f5d3418)

### 2. Modal de criação de produtos
![image](https://github.com/user-attachments/assets/17270748-133c-4854-aa6c-c07e1a680f2c)

### 3. Modal de Edição de produtos
![image](https://github.com/user-attachments/assets/f2d9f5a8-e0cd-49dc-8a38-e3635d9f7229)

### 4. Toast de sucesso para criação e/ou edição
![image](https://github.com/user-attachments/assets/dec41b23-216f-4e9e-85dc-3afef607f16e)

## 🔧 Pré-requisitos

- Node.js (v14+)
- npm (v6+)
- Docker e Docker Compose
- Git

## 🚀 Como executar

### 1. Clonar o repositório:

#### HTTPS
```bash
git clone https://github.com/marcelo-ferreira8/product-management-crud.git
```
#### SSH
```bash
git clone git@github.com:marcelo-ferreira8/product-management-crud.git
```

### 2. Configurar o Backend:
```bash
cd product-management-crud/backend
npm install
```

### 3. Configurar o Frontend:
```bash
cd ../frontend
npm install
```
### 4. Configurar e Inicar Banco de Dados: 
```bash
cd ../backend
mv .env.example .env (Renomeia o arquivo .env.example para .env)
docker-compose up -d
```

### 5. Inicar Backend: 
```bash
cd backend
npm run start:dev
```

### 6. Inicar Frontend: 
```bash
Copycd ../frontend
npm run dev
```

#### O frontend estará disponível em http://localhost:3001 e o backend em http://localhost:3000.
