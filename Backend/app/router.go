package app

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	/*Importaciones:

	github.com/gin-contrib/cors y github.com/gin-gonic/gin
	son paquetes de terceros utilizados por el framework Gin para
	manejar las solicitudes HTTP y la configuración de CORS
	(Cross-Origin Resource Sharing).
	log "github.com/sirupsen/logrus" es el paquete utilizado
	para registrar mensajes y eventos en forma de log.

	-gin proporciona un enrutador potente y flexible que permite definir las rutas de tu aplicación.
	Puedo especificar diferentes métodos HTTP (GET, POST, PUT, DELETE, etc.) y sus correspondientes
	controladores para manejar las solicitudes entrantes.

	- Gin proporciona métodos y utilidades para analizar y validar los datos de las solicitudes entrantes,
	así como para generar respuestas adecuadas, como JSON, HTML, XML, entre otros formatos.
	*/)

var (router *gin.Engine)
	//router es una variable que almacena una instancia de gin.Engine, que es el enrutador principal del framework Gin

	//Puedo utilizar métodos como router.GET(), router.POST(), router.PUT(), etc.,
	//para definir las rutas y especificar las funciones controladoras que manejarán las solicitudes HTTP correspondientes.
	//Estas funciones controladoras son responsables de procesar la solicitud, realizar operaciones
	//como acceder a la base de datos, manipular datos y generar una respuesta adecuada.

	//El enrutamiento se refiere al proceso de asignar una solicitud HTTP a una ruta
	//específica dentro de una aplicación web. Cada ruta está asociada con una URL particular
	//y un método HTTP

	//El enrutamiento se utiliza para establecer una correspondencia entre las solicitudes HTTP y
	//las funciones o controladores que se encargarán de procesar esas solicitudes.
	//Por ejemplo, si un usuario accede a la URL "/productos" con un método HTTP GET,
	//el enrutador deberá dirigir esa solicitud a la función o controlador específico que se haya configurado
	//para manejar la ruta "/productos" con el método GET.


func init() {
	router = gin.Default() // crea una instancia del enrutador Gin con la configuración predeterminada,
	// que incluye los middlewares de registro de solicitudes y recuperación de errores

	router.Use(cors.Default()) //agrega el middleware CORS predeterminado al enrutador para permitir el
	// intercambio de recursos entre diferentes dominios
}

func StartRoute() { // funcion llamada desde el main
	// para iniciar el enrutamiento de la aplicacion
	mapUrls()

	log.Info("Starting server") //registra un mensaje que indica que el servidor esta iniciado
	router.Run("0.0.0.0:8090")        //inicia el servidor en el puerto 8090 y comineza a escuchar spolicitudes entrantes

}

//ir a url_mappings.go
