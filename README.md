# Ultimate Members (frontend)

![Interface da Aplicação](https://github.com/felipebpassos/felipebpassos/blob/main/print.png?raw=true)

👉 [Live Link](https://members-area-react-ts-tailwind.vercel.app/)

Veja também: [Backend](https://github.com/felipebpassos/ultimatemembers-api-rest-node)

## Descrição do Projeto

Este é um projeto frontend de **Área de Membros para Cursos Online** desenvolvido com as seguintes tecnologias:
- **React** com **TypeScript** para construção da interface;
- **Vite** para inicialização e build rápido do projeto;
- **Tailwind CSS** para estilização responsiva e customizável;
- **Redux** para gerenciamento de estado global;
- **Integração com Backend**: O frontend agora está inteiramente integrado com a API backend para manipulação de dados dinâmicos de módulos e aulas.

### Funcionalidades
- **Login e Autenticação de Usuários**: O sistema agora utiliza autenticação via tokens JWT. Usuários logados têm acesso a módulos e aulas protegidos.
- **Exibição Dinâmica de Dados**: As informações de módulos e aulas são obtidas diretamente do backend, tornando a aplicação dinâmica.
- **Controle de Acesso às Rotas**: Implementação de redirecionamento e validação de acesso para rotas de login e dashboard.
  
Atualmente, o frontend está completamente integrado ao backend, tornando os dados dinâmicos e baseados em um sistema de autenticação via tokens.

---

## Funcionalidades Principais

### Autenticação de Usuários:
- Redireciona automaticamente usuários não logados ou com token inválido para a tela de login.
- Após o login, mantém o estado de autenticação com base em tokens JWT.

### Controle de Acesso às Rotas:
- Usuários não logados são redirecionados ao login independentemente da rota acessada.
- Usuários logados que acessam `/` são redirecionados para `/dashboard`.
- Rotas inexistentes levam os usuários logados à página de erro 404.

### Páginas Implementadas:
- **LoginPage** (`/`): Tela de login com autenticação.
- **DashboardPage** (`/dashboard`): Tela inicial após login, com resumo e navegação.
- **ModuloPage** (`/modulo/:id`): Exibição de aulas pertencentes a um módulo específico, agora com dados dinâmicos retirados da API.
- **NotFoundPage** (rota desconhecida): Página de erro 404 para rotas inválidas.

---

## Estrutura de Pastas

O projeto segue uma **arquitetura modularizada**, onde cada pasta representa uma camada ou funcionalidade específica:

<pre>
<code>
/public               # Arquivos públicos estáticos
/src                  # Código fonte principal
	/api           	  # Funções para chamadas à API
	/assets        	  # Imagens, ícones, vídeos e outros recursos
	/componentes   	  # Componentes reutilizáveis
	/pages         	  # Páginas da aplicação
	/redux         	  # Configuração e slices do Redux
	/styles        	  # Arquivos de estilo, incluindo Tailwind e customizações
	/utils         	  # Funções utilitárias
	App.tsx        	  # Componente principal da aplicação
	config.ts      	  # Configurações globais da aplicação
	main.tsx       	  # Ponto de entrada do React
.env                  # Variáveis de ambiente
.gitignore            # Arquivos e pastas ignorados pelo Git
tailwind.config.js    # Configurações do Tailwind CSS
postcss.config.js     # Configurações do PostCSS
vite.config.ts        # Configurações do Vite
package.json          # Dependências do projeto
package-lock.json     # Controle de versões das dependências
</code>
</pre>

---

## Estilização

- **Cores principais**: Definidas em `/styles/colors.ts`.
- **Estilos personalizados**: Arquivos como `card.css` e `index.css` contêm customizações específicas para componentes.

---

## Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. Clone este repositório:
   
<pre>
<code>
git clone https://github.com/felipebpassos/members-area-react-ts-tailwind.git
</code>
</pre>

2. Acesse o diretório do projeto:

<pre>
<code>
cd members-area-react-ts-tailwind
</code>
</pre>

3. Instale as dependências:

<pre>
<code>
npm install
</code>
</pre>

4. Inicie o servidor de desenvolvimento:

<pre>
<code>
npm run dev
</code>
</pre>

---

## Integração com o Backend

A aplicação consome os dados de **módulos** e **aulas** de uma API hospedada em [https://ultimatemembers-api-rest-node.onrender.com](https://ultimatemembers-api-rest-node.onrender.com/api/v1.0/api-docs/). O processo de integração foi realizado com sucesso e o fluxo de autenticação e carregamento dos dados foi implementado utilizando Redux para gerenciar o estado e as interações com a API.

Veja repositório do backend [aqui](https://github.com/felipebpassos/ultimatemembers-api-rest-node)

### Chamadas à API:

- **POST** `/api/v1.0/auth/login`: Login de usuário
- **GET** `/api/v1.0/auth/validate-token`: Validação do token JWT
- **GET** `/api/v1.0/banners`: Obter todos os banners
- **GET** `/api/v1.0/modules`: Obter todos os módulos
- **GET** `/api/v1.0/modules/{id}/lessons`: Obter aulas de um módulo específico

---

## Próximos Passos

- Implementar a edição de dados no frontend em painel administrativo, com ações para adicionar, editar ou remover módulos e aulas.
- Continuar o desenvolvimento de novas funcionalidades como: integração com marketplaces (Kiwify, Hotmart), salvar progresso, download de arquivos, multitenancy com whitelabel, comunidade, gameficação e etc.
- Adicionar testes para validar o fluxo da aplicação.
