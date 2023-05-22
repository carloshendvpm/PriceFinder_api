# Defina a imagem base com a versão do Node.js
FROM node:16-alpine

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia o package.json e yarn.lock para a pasta de trabalho
COPY package*.json ./
COPY yarn*.lock ./

# Instala o yarn e as dependências do projeto
RUN yarn install

# Copia o resto dos arquivos para a pasta de trabalho
COPY . .

# Compila o typescript para javascript
RUN yarn build

RUN npx prisma generate


# Expõe a porta que a aplicação usa
EXPOSE 3000

# Comando para executar a aplicação
CMD [ "yarn", "dev" ]