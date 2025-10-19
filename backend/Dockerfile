# Usamos a mesma imagem Node.js para manter a consistência do ambiente.
FROM node:lts-alpine

# Define o diretório de trabalho.
WORKDIR /app

# Copia os arquivos de manifesto do npm.
COPY package*.json ./

# Instala as dependências do backend.
RUN npm install

# Copia o restante do código-fonte do NestJS.
COPY . .

# Expõe a porta 3000, que é a porta padrão do NestJS.
EXPOSE 3000

# O comando para iniciar a aplicação (npm run start:dev) será fornecido no docker-compose.yml

