Sistema de Gerenciamento de Alunos com Docker 🐳

Este repositório contém a implementação de um sistema web para o gerenciamento de alunos, desenvolvido em um ambiente de desenvolvimento completo e containerizado com Docker Compose.

🚀 Sobre o Projeto

Este projeto é um sistema CRUD (Criar, Ler, Atualizar, Deletar) para o gerenciamento de alunos da escola fictícia "DevTech Academy". A aplicação permite:

Cadastrar novos alunos através de um formulário.

Listar todos os alunos cadastrados em uma tabela.

Editar as informações de um aluno existente.

Excluir um aluno da lista.

Gerar relatórios dinâmicos, como a lista de alunos aprovados, média de notas, e mais.

O sistema foi construído aplicando conceitos de manipulação de DOM com JavaScript puro, orientação a objetos (Classes), tratamento de eventos e programação funcional com métodos de array (map, filter, reduce, sort).

🛠️ Tecnologias Utilizadas

Linguagens: HTML5, CSS3, JavaScript (ES6+)

Framework CSS: Bootstrap 5

Containerização: Docker e Docker Compose

Ambiente de Servidor: Vite (para desenvolvimento frontend)

✅ Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas em sua máquina:

Git

Docker Desktop

⚙️ Como Executar

Siga os passos abaixo para levantar todo o ambiente na sua máquina local.

1. Clone o repositório

git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)
cd SEU-REPOSITORIO


2. Configure as variáveis de ambiente

Copie o arquivo de exemplo .env.example para um novo arquivo chamado .env.

cp .env.example .env


As variáveis de ambiente neste projeto são para os serviços de banco de dados e pgAdmin, que fazem parte do boilerplate base.

3. Suba os contêineres

Este comando irá construir as imagens (na primeira vez) e iniciar todos os serviços em segundo plano.

docker-compose up --build -d


(A flag -d executa os contêineres em modo "detached", liberando seu terminal).

🌐 Acessando a Aplicação

Após a execução, o sistema de gerenciamento de alunos estará disponível no seguinte endereço:

Serviço

URL de Acesso

Propósito

Sistema de Alunos

http://localhost:5173

Acesso direto à aplicação de gerenciamento de alunos.

(Nota: O ambiente completo também inclui outros serviços como Nginx e pgAdmin, que podem ser acessados conforme configurado no boilerplate original, mas não são diretamente utilizados por esta aplicação específica).

comandos Úteis do Docker Compose

Parar todos os contêineres:

docker-compose down


Ver os logs do serviço de frontend:

docker-compose logs -f frontend


Ver o status dos contêineres:

docker-compose ps
