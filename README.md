# Ultimate Members (frontend)

![Interface da Aplicação](https://github.com/felipebpassos/felipebpassos/blob/main/print.png?raw=true)

## Descrição do Projeto

Este é um projeto frontend de **Área de Membros para Cursos Online** desenvolvido com as seguintes tecnologias:
- **React** com **TypeScript** para construção da interface;
- **Vite** para inicialização e build rápido do projeto;
- **Tailwind CSS** para estilização responsiva e customizável;
- **Redux** para gerenciamento de estado global.

Atualmente, os dados utilizados são estáticos, mas a estrutura já está preparada para integração com uma API futura. As imagens e vídeos estão hospedados em um bucket público na AWS S3.

---

## Funcionalidades Principais

### Autenticação de Usuários:
- Redireciona automaticamente usuários não logados ou com token inválido para a tela de login.
- Após o login, mantém o estado de autenticação com base em tokens.

### Controle de Acesso às Rotas:
- Usuários não logados são redirecionados ao login independentemente da rota acessada.
- Usuários logados que acessam `/` são redirecionados para `/dashboard`.
- Rotas inexistentes levam os usuários logados à página de erro 404.

### Páginas Implementadas:
- **LoginPage** (`/`): Tela de login com autenticação.
- **DashboardPage** (`/dashboard`): Tela inicial após login, com resumo e navegação.
- **ModuloPage** (`/modulo/:id`): Exibição de aulas pertencentes a um módulo específico.
- **NotFoundPage** (rota desconhecida): Página de erro 404 para rotas inválidas.

---

## Estrutura de Pastas

O projeto segue uma **arquitetura modularizada**, onde cada pasta representa uma camada ou funcionalidade específica:

<pre>
<code>
/public               # Arquivos públicos estáticos
/src                  # Código fonte principal
	|_ /api           # Funções para chamadas à API
	   /assets        # Imagens, ícones, vídeos e outros recursos
	   /componentes   # Componentes reutilizáveis
	   /pages         # Páginas da aplicação
	   /redux         # Configuração e slices do Redux
	   /styles        # Arquivos de estilo, incluindo Tailwind e customizações
	   /utils         # Funções utilitárias
	   App.tsx        # Componente principal da aplicação
	   config.ts      # Configurações globais da aplicação
	   main.tsx       # Ponto de entrada do React
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

## Próximos Passos

- Desenvolver o backend da aplicação e substituir os dados estáticos por uma API real.
- Integrar a API ao frontend utilizando as funções da pasta `/api`.

