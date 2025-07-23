FROM node
EXPOSE 3000
WORKDIR /frontend/client

#archivos de dependencias primero ya que es un proceso cacheado
COPY package*.json ./


RUN npm install

# Copia el resto de los archivos
COPY . .

# Comandos por defecto para iniciar la app
CMD ["npm", "run", "start"]

