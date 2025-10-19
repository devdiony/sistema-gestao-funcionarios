# Começa com a imagem oficial e leve do Nginx baseada no Alpine Linux.
FROM nginx:alpine

# Remove a configuração padrão do Nginx.
RUN rm /etc/nginx/conf.d/default.conf

# Copia o nosso arquivo de configuração customizado para o local correto dentro do contêiner.
# O Nginx irá carregar automaticamente este arquivo na inicialização.
COPY nginx.conf /etc/nginx/conf.d/
