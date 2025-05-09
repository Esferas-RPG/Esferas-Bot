# Esferas-Bot

**Esferas-Bot** é um bot para Discord desenvolvido com Node.js, projetado para auxiliar na administração e gerenciamento do servidor de roleplay *Esferas D\&D 2024*. Ele interage com uma API própria para fornecer comandos personalizados, automações e funcionalidades integradas ao mundo de jogo.

## ⚙️ Funcionalidades

* Comandos personalizados para personagens, fichas e eventos
* Integração com a API Esferas para operações em tempo real
* Moderação de canais e usuários
* Sistema de eventos dinâmicos
* Integração com webhooks e respostas reativas

## 🔗 API Relacionada

Este bot depende da [Esferas.Bot.API](https://github.com/Esferas-RPG/Esferas.Bot.API), que gerencia os dados e operações no backend.

## 🚀 Instalação

### Pré-requisitos

* Node.js >= 18.x
* Yarn ou npm
* Variáveis de ambiente (.env)
* Token de Aplicação do Discord: [Configurar uma aplicação de bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

### Passos

```bash
git clone https://github.com/Esferas-RPG/Esferas-Bot.git
cd Esferas-Bot
yarn install
# ou npm install
```

Crie um arquivo `.env` com as seguintes variáveis:

```env
BOT_TOKEN=seu_token_aqui
API_URL=https://sua-api.com/api
```

Execute o bot:

```bash
yarn start
# ou npm start
```

## 🧪 Desenvolvimento

Para executar com reinício automático:

```bash
yarn dev
```

## 🐳 Docker

Para subir com Docker:

```bash
docker build -t esferas-bot .
docker run -d --env-file .env esferas-bot
```

## 📄 Licença

MIT © 2024 Esferas RPG
