
FROM node:14-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

RUN npm prune --production

COPY . .

CMD [ "node", "index.js" ]