# ResKillPlus - Front-End

Plataforma de requalificação profissional desenvolvida para a Global Solution da FIAP.

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **React Router DOM** - Roteamento de páginas

## 📋 Funcionalidades

- ✅ Sistema de tema claro/escuro com Context API
- ✅ Gerenciamento completo de Usuários
- ✅ Gerenciamento de Cursos
- ✅ Gerenciamento de Habilidades
- ✅ Gerenciamento de Matrículas
- ✅ Sistema de Recomendações
- ✅ Gestão de Pagamentos
- ✅ Autenticação OAuth (GitHub, Google, Microsoft)
- ✅ Interface responsiva e moderna

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/gugomesx10/ResKillPlus---Front-End.git

# Entre na pasta do projeto
cd ResKillPlus---Front-End

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

## 🌐 URLs

- **Front-end (Desenvolvimento)**: http://localhost:5173
- **Front-end (Produção)**: [URL do Vercel - será adicionada após deploy]
- **API Backend**: [URL da API no Render]

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header/
│   ├── Footer/
│   ├── Card/
│   ├── Button/
│   ├── Input/
│   └── Loading/
├── context/            # Context API (Tema)
├── routes/             # Páginas da aplicação
│   ├── Home/
│   ├── Sobre/
│   ├── Integrantes/
│   ├── Contato/
│   ├── Cursos/
│   ├── Usuarios/
│   ├── Habilidades/
│   ├── Matriculas/
│   ├── Recomendacoes/
│   ├── Pagamentos/
│   └── Login/
├── services/           # Serviços de API
└── types/              # Tipos TypeScript
```

## 🔑 Configuração da API

A aplicação consome a API Java com autenticação via header:

```typescript
headers: {
  'x-api-key': 'reskillplus123'
}
```

## 📝 Endpoints Consumidos

### Usuários
- `POST /usuario` - Criar usuário
- `GET /usuario/buscar/{cpf}` - Buscar por CPF
- `GET /usuario/validar/{cpf}/{senha}` - Validar credenciais
- `PUT /usuario` - Atualizar usuário
- `DELETE /usuario/excluir/{cpf}` - Excluir usuário

### Cursos
- `POST /curso` - Criar curso
- `GET /curso/buscar/{nome}` - Buscar por nome
- `PUT /curso` - Atualizar curso
- `DELETE /curso/excluir/{nome}` - Excluir curso

### Habilidades
- `POST /habilidade` - Criar habilidade
- `GET /habilidade/buscar/{nome}` - Buscar por nome
- `PUT /habilidade` - Atualizar habilidade
- `DELETE /habilidade/excluir/{nome}` - Excluir habilidade

### Matrículas
- `POST /matricula` - Criar matrícula
- `GET /matricula/buscar/{cpfUsuario}/{nomeCurso}` - Buscar matrícula
- `PUT /matricula` - Atualizar matrícula
- `DELETE /matricula/excluir/{cpfUsuario}/{nomeCurso}` - Excluir matrícula

### Recomendações
- `POST /recomendacao` - Criar recomendação
- `GET /recomendacao/buscar/{cpf}` - Buscar por CPF
- `PUT /recomendacao` - Atualizar recomendação
- `DELETE /recomendacao/excluir/{id}` - Excluir recomendação

### Pagamentos
- `POST /pagamento` - Criar pagamento
- `GET /pagamento` - Listar todos
- `GET /pagamento/{id}` - Buscar por ID
- `PUT /pagamento/{id}/status?valor={status}` - Atualizar status
- `DELETE /pagamento/{id}` - Excluir pagamento

### Autenticação OAuth
- `GET /auth/github/login` - Login com GitHub
- `GET /auth/google/login` - Login com Google
- `GET /auth/microsoft/login` - Login com Microsoft
- `GET /auth/{provider}/callback` - Callback OAuth

## 👨‍💻 Desenvolvedor

- **Nome**: Gustavo Gomes Martins
- **RM**: 555999
- **Turma**: TDSPO
- **GitHub**: [@gugomesx10](https://github.com/gugomesx10)

## 📄 Licença

Este projeto foi desenvolvido como parte da Global Solution da FIAP - 2025.

## 🎥 Vídeo Demonstrativo


