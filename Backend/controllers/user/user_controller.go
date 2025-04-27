package userController

import (
			"backend/dto"
	service "backend/services"
			"net/http"
			"strconv"
			"github.com/gin-gonic/gin"
		
	log  	"github.com/sirupsen/logrus"
)

/*Esta seccion va dedicada a enteneder que es lo que realiza el controlador, cuales son 
sus responsabidades y alcances: 
Responsabilidad principal: El controlador actúa como intermediario entre la vista (frontend) y el modelo (backend).
Rol específico:
1- Procesar las solicitudes entrantes del usuario (como peticiones HTTP en una API).
2- Validar y transformar los datos de entrada antes de pasarlos 
3-al servicio correspondiente (la lógica del negocio).
4-Invocar los métodos del servicio (que interactúan con los modelos) para realizar operaciones.
5-Transformar los resultados obtenidos de los servicios (o manejar errores)
 y devolver respuestas a la vista en un formato adecuado (por ejemplo, JSON).


*/


func GetUserById(c *gin.Context) { //esta es la declaración de una función llamada
	// GetUserById que toma un parámetro c de tipo *gin.Context.
	
	//Al pasar c *gin.Context como parámetro en la función GetUserById,
	//estás permitiendo que la función acceda y utilice el contexto de la solicitud HTTP.
	//Dentro de la función, se puede acceder a los parámetros de la ruta utilizando c.Param("nombreParametro"),
	// donde "nombreParametro" es el nombre del parámetro definido en la ruta de la API.

  //*gin.context es una estructura que cuenta con el contenido-contexto de una estructura HTTP. 
	log.Debug("User id to load: " + c.Param("id")) //Esta línea registra un mensaje de depuración utilizando
	// el paquete de registro log. El mensaje muestra el ID del
	//usuario que se cargará, obtenido del parámetro "id" en el
	//contexto de Gin.
	
	id, _ := strconv.Atoi(c.Param("id")) //Esta línea convierte el parámetro "id" en el contexto de Gin en un entero
	var userDto dto.UserDetailDto        //Se declara una variable userDto de tipo dto.UserDetailDto

	userDto, err := service.UserService.GetUserById(id) //se llama a la función GetUserById del servicio UserService,
	// pasando el ID del usuario como argumento.
	//El resultado se asigna a las variables userDto y err

	if err != nil { // si algo sale mal tira error.
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, userDto) // si no hasy errores se devuelve una respuesta json con el codigo de estado Http

}

func GetUsers(c *gin.Context) { //Esta función manejará una solicitud HTTP para obtener una lista de usuarios.

	var usersDto dto.UsersDto // Se declara una variable usersDto de tipo dto.UsersDto. Esta variable se utilizará
	// para almacenar los datos de los usuarios obtenidos del servicio.

	 //Se llama a la función GetUsers del servicio UserService
	// La función GetUsers del servicio se encarga de obtener la
	//lista de usuarios y devuelve los datos en forma de dto.UsersDto
	
	usersDto, err := service.UserService.GetUsers()

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, usersDto)
}






func UserInsert(c *gin.Context) { 
	var userDto dto.UserDto 

	err := c.BindJSON(&userDto) //BindJSON es un método de c que se utiliza para vincular los datos
	// JSON recibidos en la solicitud a una estructura de datos en Go.
	// &userDto pasa la direccion de memoria de la variable

	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
		//Se verifica si hay un error en la conversión del JSON.
		//Si hay un error, se registra un mensaje de error utilizando el paquete de
		//registro log y se devuelve una respuesta JSON con un código de estado HTTP 400 (Bad Request)
		//y el mensaje de error.
	}

	userDto, er := service.UserService.InsertUser(userDto)
	//Se llama a la función InsertUser del servicio UserService para insertar el
	//nuevo usuario en la base de datos. El resultado se asigna a las variables userDto y er. La función InsertUser
	//devuelve los datos del usuario insertado y un posible error.
	if er != nil {
		c.JSON(er.Status(), er)
		return
	}

	c.JSON(http.StatusCreated, userDto) // Si no hay errores, se devuelve una respuesta JSON
	// con un código de estado HTTP 201 (Created) y los datos del usuario insertado.
}



func Login(c *gin.Context){

	var loginDto dto.LoginDto 
	err := c.BindJSON(&loginDto)

	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	loginResponse, er := service.UserService.Login(loginDto)

	if er != nil {
		c.JSON(er.Status(), er)
		return
	}
	c.JSON(http.StatusOK,loginResponse)

}





/*
func AddUserTelephone(c *gin.Context) { //meneja una solicitud de post para agregar
	// un nuemero de telefono a un usuario existente

	log.Debug("Adding Telephone to user: " + c.Param("id"))
	id, _ := strconv.Atoi(c.Param("id"))

	var telephoneDto dto.TelephoneDto
	err := c.BindJSON(&telephoneDto)

	// Error Parsing json paramet
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	telephoneDto.UserId = id

	var userDto dto.UserDetailDto

	userDto, er := service.UserService.AddUserTelephone(telephoneDto)
	//Error del Insert
	if er != nil {
		c.JSON(er.Status(), er)
		return
	}

	c.JSON(http.StatusCreated, userDto)
}
*/
/*En general, estos controladores interactúan con los servicios relacionados
(service.UserService) para realizar operaciones como obtener usuarios, insertar usuarios
y agregar números de teléfono a los usuarios.*/

//ir a services/user_service.go
