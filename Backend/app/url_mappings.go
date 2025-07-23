package app

//la funcion de la creacion de este archvio es la separacion de las rutas
// de la logica de inicializacion del enrutador

import (
	amenitiController "backend/controllers/ameniti"
	hotelController "backend/controllers/hotel"
	reservController "backend/controllers/reserv"
	userController "backend/controllers/user"

	//importa el paquete "userController" del directorio "mvc-go/controllers/user".
	//Esto indica que se utilizará un controlador específico para manejar las rutas relacionadas con los usuarios.

	log "github.com/sirupsen/logrus"
)

func mapUrls() { 
	//Esta función es llamada desde la función StartRoute()
	// en el archivo "app/router.go". Su propósito es configurar
	//las rutas de la aplicación y asignarlas a los controladores correspondientes.

	// Users Mapping 
	//USERS
	router.GET("/user/:id", userController.GetUserById)
	router.GET("/user", userController.GetUsers)
	router.POST("/user", userController.UserInsert)
	router.PUT("/user/role/:id", userController.ChangeRole)
    //Login Mapping
	router.POST("/login",userController.Login)

	//Hotels:
	router.GET("/hotels",hotelController.GetHotels)
	router.GET("/hotel/:id",hotelController.GetHotel)
	router.POST("/hotels",hotelController.InsertHotel)
	router.PUT("/hotels/:id",hotelController.UpdateHotel)
    router.DELETE("/hotels/:id", hotelController.DeleteHotel)

	//Amenities:
	router.POST("/amenities",amenitiController.InsertNewAmenity)
	router.GET("/amenities",amenitiController.GetAmenities)
    router.PUT("/amenities/:id",amenitiController.UpdateAmenities)
	router.DELETE("/amenities/:id",amenitiController.DeleteAmenities)
	
	//Imagenes:
	router.POST("/upload", hotelController.UploadImage)
	router.Static("/uploads/img/hotels", "./uploads/img/hotels")

	//Rerserva:
	router.POST("/reserv/check",reservController.CheckDisponibility) //esta no esta del todo bien, deberia ser un GET
	router.POST("/reserv",reservController.InsertRerserv)
	router.DELETE("/reserv/:id", reservController.DeleteReserv)
    router.PUT("/reserv/:id", reservController.UpdateReserv)
	router.GET("/reserv",reservController.GetReservs)
	router.GET("/reserv/disponibility", reservController.SearchAvaliabity)
	router.GET("/reserv/future/:id", reservController.GetFutureReservsByUser)

	//router.GET("/reserv/user/hotels", reservController.GetAllDetails)


	//Mediante llamadas a métodos como router.GET(), router.POST(), etc.,
	//se definen las rutas y se especifican los controladores que manejarán las solicitudes HTTP correspondientes.

	/*Por ejemplo, router.GET("/user/:id", userController.GetUserById)
	establece una ruta para obtener un usuario por su identificador.
	Cuando se realice una solicitud GET a la URL "/user/:id",
	el controlador userController.GetUserById será el encargado de manejarla.
	El parámetro ":id" representa un identificador único que se pasará como argumento al controlador.*/

	log.Info("Finishing mappings configurations") // registra un mensaje informativo indicando
	// que la configuración de las rutas ha finalizado.
	//Este mensaje puede ser útil para verificar que las
	//rutas se hayan configurado correctamente
}

//ir a controler/user/user_controler.go

/*Dentro de los controladores,  funciones que se
  encargan de manejar las solicitudes entrantes relacionadas con los usuarios,
  como obtener un usuario por ID, obtener todos los usuarios,
  insertar un nuevo usuario etc..
*/
