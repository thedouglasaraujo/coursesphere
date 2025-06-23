<div align="center">

# 📝 CourseSphere

Plataforma para **gerenciamento colaborativo de cursos e aulas**, permitindo múltiplos instrutores e estudantes autenticados interagirem.

</div>

## ✅ Pré-requisitos

- React
- Node.js (v18 ou superior)
- NPM ou Yarn
- PostgreSQL
- Sequelize

---

## ▶️ Como executar o projeto

### 🔧 Backend
1. Clone o repositório e navegue até a pasta do backend:

   ```bash
   git clone https://github.com/thedouglasaraujo/coursesphere
   cd coursesphere
   cd backend
   ```
1. Instale as dependências:

   ```bash
   npm install
   ```
1. Edite o arquivo config/config.js com as credenciais do seu PostgreSQL
2. Rode as migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```
3. Inicie o servidor:

   ```bash
   node src/index.js
   ```
   O servidor estará disponível em: http://localhost:3000

### 💻 Frontend
1. Acesse a pasta do frontend

2. Instale as dependências:
   
   ```bash
   npm install
   ```
4. Execute a aplicação:
    
   ```bash
   npm start
   ```
    A interface será aberta em: http://localhost:3001

### 📄 Configuração do .env

Crie um arquivo .env dentro da pasta backend com as variáveis de ambiente necessárias. Você pode usar o arquivo .env.example disponível no projeto como base.

## 🚀 Funcionalidades Principais

- ✅ Autenticação de usuários com email e senha
- ✅ CRUD completo de cursos e aulas
- ✅ Regras de acesso baseadas em permissões
- ✅ Colaboração entre usuários autenticados
- ✅ Busca com filtros e paginação
- ✅ Integração com API externa para sugestão de instrutores

## 🧩 Stack Utilizada

- **React** (com Hooks)
- **React Router DOM**
- **Material UI (MUI)** para layout e responsividade
- **NodeJS** (API local)
- **Random User API** (`https://randomuser.me`) para sugestão e importação de instrutores

## 🔐 Regras de Acesso

| Ação                        | Criador do Curso   | Instrutor   |
|-----------------------------|--------------------|-------------|
| Editar/Excluir Curso        | ✅                 | ❌          |
| Gerenciar Instrutores       | ✅                 | ❌          |
| Criar Aula                  | ✅                 | ✅          |
| Editar/Excluir Aula         | ✅ (todas)         | ✅ (as suas) |

## 🎯 Telas Implementadas

- **Login** com validação e proteção de rotas
- **Dashboard** com cursos do usuário
- **Detalhes do Curso** com aulas e instrutores
- **Cadastro/Edição de Cursos**
- **Cadastro/Edição de Aulas**
- **Gerenciamento de Instrutores**
- **Tela de Acesso Negado ou Erro Inesperado**

## ✅ Diferenciais Implementados

- **Atomic Design** na organização dos componentes
- **Commits semânticos** seguindo boas práticas
- **Layout responsivo** e visualmente consistente
- **Feedbacks visuais** para carregamento, sucesso e erro
- Tela de **Acesso Negado** ou **Erro**
- **Validações** de formulários
</p>

