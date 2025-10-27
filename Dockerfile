# Etapa de construcción
FROM node:22 AS builder

WORKDIR /usr/src/app

# Copiar solo los archivos de dependencias primero
COPY package*.json ./

# Instalar dependencias con npm
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la app (Next.js o React, depende lo que tengas)
RUN npm run build

# Etapa final: solo lo necesario para correr
FROM node:22

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./

EXPOSE 3000

CMD ["npm", "start"]