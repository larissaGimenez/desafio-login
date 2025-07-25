# Desafio Técnico - Mini Sistema de Login

Uma aplicação full-stack completa que implementa um sistema de cadastro e autenticação de usuários com uma API RESTful em FastAPI e um cliente em React. A aplicação é totalmente containerizada com Docker.

## Stack de Tecnologias
* **Back-end:** Python, FastAPI, SQLAlchemy
* **Front-end:** React, Vite, Axios, React Router
* **Banco de Dados:** SQLite
* **Ambiente:** Docker, Docker Compose

## Funcionalidades
* Cadastro de novos usuários.
* Login com autenticação baseada em Token JWT.
* Rotas de API protegidas.
* Dashboard de usuário com menu responsivo (hambúrguer).
* Gerenciamento de usuários (Listar e Excluir).
* Interface estilizada e com feedback de loading/erro.

## Como Rodar a Aplicação (Localmente)

### Pré-requisitos
* Docker e Docker Compose instalados.

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/larissaGimenez/desafio-login](https://github.com/larissaGimenez/desafio-login)
    cd desafio-login
    ```

2.  **Configure as Variáveis de Ambiente do Back-end:**
    * Navegue até a pasta do back-end: `cd backend`
    * Copie o arquivo de exemplo `.env.example` para um novo arquivo `.env`:
        ```bash
        cp .env.example .env
        ```
    * Gere uma chave secreta segura rodando o seguinte comando no terminal:
        ```bash
        python -c 'import secrets; print(secrets.token_hex(32))'
        ```
    * Abra o arquivo `.env` e cole a chave gerada no campo `SECRET_KEY`.

3.  **Suba os Contêineres Docker:**
    * Volte para a pasta raiz do projeto: `cd ..`
    * Execute o Docker Compose. Este comando irá construir as imagens e iniciar os contêineres do back-end e do front-end.
        ```bash
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
        ```

## Acessando a Aplicação

Após a inicialização, os serviços estarão disponíveis nos seguintes endereços:

* 🌐 **Front-end (Aplicação React):** `http://localhost:5173`
* ⚙️ **Back-end (Documentação da API):** `http://localhost:8000/docs`