FROM golang:1.24-alpine 

# Directorio dentro del contenedor donde irá el código
WORKDIR /backendApp

# Copiamos todo el código del proyecto al contenedor
COPY . .

# Descargamos dependencias
RUN go mod tidy

# Compilamos la app (crea un binario llamado "main")
RUN go build -o main .

# RUN go test ./...

# Puerto en el que corre tu servidor 
EXPOSE 8090

# Comando que se ejecuta al iniciar el contenedor
CMD ["./main"]
