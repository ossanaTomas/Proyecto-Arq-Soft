package main

import (
	"mvc-go/app" // contiene la logica y las rutas de aplicaciones
	"mvc-go/db"  // contiene el codigo relacionado con la gestion de base de datos
)

func main() {
	db.StartDbEngine()// StartDbEngine() del paquete "mvc-go/db". inicia el motor de la base de datos
	//y establece la conexión con la base de datos .
	app.StartRoute() //StartRoute() del paquete "mvc-go/app".
	// Esta función inicia el enrutamiento de la aplicación, configurando las rutas y controladores necesarios para
	//manejar las solicitudes HTTP entrantes.
}

