# Usamos a imagem Node.js LTS (Long Term Support) baseada no Alpine por ser leve.
FROM node:lts-alpine

# Define o diretório de trabalho padrão dentro do contêiner.
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o contêiner.
COPY package*.json ./

# Instala as dependências do projeto.
RUN npm install

# Copia todo o resto do código-fonte para o diretório de trabalho.
COPY . .

# Expõe a porta 5173, que o Vite usa para o servidor de desenvolvimento.
EXPOSE 5173

# O comando para iniciar a aplicação (npm run dev) será fornecido no docker-compose.yml

