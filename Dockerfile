FROM  node:erbium-alpine
ENV NODE_ENV=production

WORKDIR /code
COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE ${PORT:-3000}

CMD ["node", "."]