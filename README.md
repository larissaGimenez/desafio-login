# Desafio Técnico - Mini Sistema de Login

Este projeto implementa uma API de login simples com FastAPI e Docker, e um front-end em React.

## Como Rodar o Back-end

### Pré-requisitos
* Docker e Docker Compose instalados.

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    cd desafio-login
    ```

2.  **Configure as Variáveis de Ambiente:**
    * Navegue até a pasta do back-end: `cd backend`
    * Copie o arquivo de exemplo `.env.example` para um novo arquivo `.env`:
        ```bash
        cp .env.example .env
        ```
    * Gere uma chave secreta segura rodando o seguinte comando no terminal:
        ```bash
        python -c 'import secrets; print(secrets.token_hex(32))'
        ```
    * Abra o arquivo `.env` que você acabou de criar e cole a chave gerada no campo `SECRET_KEY`.

3.  **Suba os Contêineres Docker:**
    * Volte para a pasta raiz do projeto: `cd ..`
    * Execute o Docker Compose:
        ```bash
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
        ```

4.  **Acesse a API:**
    * A API estará rodando em `http://localhost:8000`.
    * A documentação interativa está disponível em `http://localhost:8000/docs`.