# Ambiente de Desenvolvimento Full-Stack com Docker 🐳

Este repositório contém uma configuração padronizada e pronta para uso de um ambiente de desenvolvimento completo, utilizando Docker Compose para orquestrar todos os serviços necessários para uma aplicação web moderna.

## 🚀 Sobre o Projeto

O objetivo é fornecer um boilerplate que acelera o início de novos projetos, garantindo que toda a equipe de desenvolvimento trabalhe em um ambiente idêntico e livre de problemas como o famoso "na minha máquina funciona".

## 🛠️ Tecnologias Utilizadas

-   **Frontend:** React (com Vite)
-   **Backend:** NestJS
-   **Banco de Dados:** PostgreSQL
-   **Admin do Banco de Dados:** pgAdmin
-   **Proxy Reverso:** Nginx
-   **Containerização:** Docker e Docker Compose

## ⚙️ Como Executar

Siga os passos abaixo para levantar todo o ambiente na sua máquina local.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
    cd SEU-REPOSITORIO
    ```

2.  **Configure as variáveis de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.
    ```bash
    cp .env.example .env
    ```
    *Você pode alterar os valores dentro do `.env` se desejar.*

3.  **Suba os contêineres:**
    Este comando irá construir as imagens e iniciar todos os serviços.
    ```bash
    docker-compose up --build
    ```

## 🌐 Acessando os Serviços

Após a execução, os serviços estarão disponíveis nos seguintes endereços:

-   **Aplicação (Frontend via Nginx):** `http://localhost:80`
-   **API (Backend via Nginx):** `http://localhost/api/`
-   **pgAdmin (Admin do Banco):** `http://localhost:5050`
