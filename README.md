# 🎮 GamePlay

Aplicativo mobile desenvolvido com **React Native** para organizar e gerenciar partidas com amigos de forma simples e intuitiva.

O **GamePlay** permite autenticação via Discord, criação de grupos e agendamento de sessões de jogo, facilitando a comunicação e organização entre jogadores.

---

## 🚀 Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

* React Native
* Expo
* TypeScript
* Axios
* React Navigation
* OAuth2 (Discord)

---

## 📱 Funcionalidades

* 🔐 Login social com Discord
* 👤 Exibição de perfil do usuário (nome e avatar)
* 🎮 Listagem de servidores do Discord
* 📅 Agendamento de partidas
* 📂 Filtro de partidas por categoria
* 📌 Identificação de partidas criadas pelo usuário
* 🔗 Compartilhamento de convites

---

## 📸 Preview

> Adicione aqui prints ou GIFs do app rodando

---

## ⚙️ Como rodar o projeto

### 📌 Pré-requisitos

* Node.js
* Expo CLI
* Conta no Discord Developer

---

### 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/ricardocardoso90/react-native-project-game-play.git

# Acesse a pasta
cd react-native-project-game-play

# Instale as dependências
npm install
```

---

### ▶️ Executando o projeto

```bash
# Inicie o projeto
npx expo start
```

Depois disso, você pode:

* Rodar no emulador Android
* Rodar no iOS (Mac)
* Ou escanear o QR Code com o app Expo Go

---

## 🔑 Configuração do ambiente

Para que o login com Discord funcione corretamente:

1. Crie uma aplicação no **Discord Developer Portal**
2. Configure o OAuth2
3. Adicione as credenciais no projeto (arquivo `.env`)

Exemplo:

```env
CLIENT_ID=seu_client_id
REDIRECT_URI=seu_redirect_uri
SCOPE=identify email guilds
RESPONSE_TYPE=token
```

---

## 📂 Estrutura do projeto

```
src/
 ├── assets/
 ├── components/
 ├── screens/
 ├── routes/
 ├── services/
 └── utils/
```

---

## 🧠 Aprendizados

Este projeto foi desenvolvido com foco em:

* Autenticação social (OAuth2)
* Consumo de APIs externas
* Navegação entre telas
* Organização de projeto React Native
* Boas práticas com TypeScript

---

## 📌 Melhorias futuras

* 🔔 Notificações
* 💬 Chat entre jogadores
* 🌐 Backend próprio
* 🏆 Sistema de ranking

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

Desenvolvido por **Ricardo Cardoso**

* GitHub: https://github.com/ricardocardoso90
