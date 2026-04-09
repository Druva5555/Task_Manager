FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# Vite default port is 5173. We'll run it in host mode so it's accessible.
CMD ["npm", "run", "dev", "--", "--host"]
