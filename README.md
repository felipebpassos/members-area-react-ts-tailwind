# Projeto Frontend: React + TypeScript + Vite + Tailwind CSS

## Descrição do Projeto

Este é um projeto frontend desenvolvido com as seguintes tecnologias:
- **React** com **TypeScript** para construção da interface;
- **Vite** para inicialização e build rápido do projeto;
- **Tailwind CSS** para estilização responsiva e customizável;
- **Redux** para gerenciamento de estado global.

Atualmente, os dados utilizados são estáticos, mas a estrutura já está preparada para integração com uma API futura. As imagens e vídeos estão hospedados em um bucket público na AWS S3.

---

## Estrutura de Pastas

O projeto segue uma **arquitetura modularizada**, onde cada pasta representa uma camada ou funcionalidade específica:

```bash
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


---

## Estilização

- **Cores principais**: Definidas em `/styles/colors.ts`.
- **Estilos personalizados**: Arquivos como `card.css` e `index.css` contêm customizações específicas para componentes.

---

## Próximos Passos

- Desenvolver o backend da aplicação e substituir os dados estáticos por uma API real.
- Integrar a API ao frontend utilizando as funções da pasta `/api`.

---

## Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. Clone este repositório:
   ```bash
   git clone <url-do-repositorio>

   ```bash
   cd <nome-do-projeto>

   ```bash
   npm install

   ```bash
   npm run dev

