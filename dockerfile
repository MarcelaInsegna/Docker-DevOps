# Usar una imagen de Node.js
FROM node:18

# Crear y definir el directorio de trabajo
WORKDIR /app

# Copiar archivos de la aplicación
COPY package*.json ./
RUN npm install

COPY . . 

# Exponer el puerto en el contenedor
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]