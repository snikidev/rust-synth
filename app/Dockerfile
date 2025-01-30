FROM node:20-alpine
RUN apk add --no-cache yarn
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["yarn", "dev"]