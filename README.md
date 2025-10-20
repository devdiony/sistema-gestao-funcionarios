Ambiente de Desenvolvimento Full-Stack com Docker 🐳

Este repositório contém uma configuração padronizada e pronta para uso de um ambiente de desenvolvimento completo, utilizando Docker Compose para orquestrar todos os serviços necessários para uma aplicação web moderna.

🚀 Sobre o Projeto

O objetivo é fornecer um boilerplate que acelera o início de novos projetos, garantindo que toda a equipe de desenvolvimento trabalhe em um ambiente idêntico e livre de problemas como o famoso "na minha máquina funciona".

Este ambiente foi configurado para suportar hot-reloading nos serviços de frontend e backend, refletindo as alterações de código em tempo real, sem a necessidade de reconstruir as imagens.

🛠️ Tecnologias Utilizadas

Frontend: React (com Vite)

Backend: NestJS

Banco de Dados: PostgreSQL

Admin do Banco de Dados: pgAdmin

Proxy Reverso: Nginx

Containerização: Docker e Docker Compose

✅ Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas em sua máquina:

Git

Docker Desktop

⚙️ Como Executar

Siga os passos abaixo para levantar todo o ambiente na sua máquina local.

1. Clone o repositório

Substitua SEU-USUARIO e SEU-REPOSITORIO pelos seus dados correspondentes.

git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)
cd SEU-REPOSITORIO


2. Configure as variáveis de ambiente

Copie o arquivo de exemplo .env.example para um novo arquivo chamado .env. É este arquivo que o Docker Compose usará para configurar os serviços.

cp .env.example .env


Você pode alterar os valores dentro do .env se desejar, como a senha do banco de dados.

3. Suba os contêineres

Este comando irá construir as imagens (na primeira vez) e iniciar todos os serviços em segundo plano.

docker-compose up --build -d


(A flag -d executa os contêineres em modo "detached", liberando seu terminal).

🌐 Acessando os Serviços

Após a execução, os serviços estarão disponíveis nos seguintes endereços:

Serviço

URL de Acesso

Propósito

Credenciais (do .env)

Aplicação (Via Proxy Nginx)

http://localhost:80

Ponto de entrada principal, simulando um ambiente de produção.

N/A

Frontend Direto (Vite)

http://localhost:5173

Acesso direto ao servidor de desenvolvimento do Vite para testes isolados do frontend.

N/A

API (Backend via Nginx)

http://localhost/api/

Ponto de entrada para a API.

N/A

pgAdmin (Admin do BD)

http://localhost:5050

Interface de gerenciamento do banco de dados.

Email: PGADMIN_DEFAULT_EMAIL
Senha: PGADMIN_DEFAULT_PASSWORD

💡 Conectando ao Banco de Dados pelo pgAdmin

Para se conectar ao servidor PostgreSQL a partir do pgAdmin, siga estes passos:

Faça login no pgAdmin.

Clique em "Add New Server".

Na aba "General", dê um nome para o servidor (ex: docker-postgres).

Na aba "Connection", use os seguintes dados:

Host name/address: db (o nome do serviço no docker-compose.yml)

Port: 5432

Maintenance database: O valor de POSTGRES_DB do seu .env

Username: O valor de POSTGRES_USER do seu .env

Password: O valor de POSTGRES_PASSWORD do seu .env

Clique em "Save".

comandos Úteis do Docker Compose

Parar todos os contêineres:

docker-compose down


Ver os logs de um serviço específico (ex: frontend):

docker-compose logs -f frontend


(A flag -f segue os logs em tempo real).

Ver o status dos contêineres:

docker-compose ps


📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.