package services

import (
	//addressCliente "mvc-go/clients/address"
	//telephoneCliente "mvc-go/clients/telephone"
	userCliente "backend/clients-DAO/user"
	//"mvc-go/clients-DAO/address"
	"backend/dto" //contienelas estructuras de datos de transferencia de objetos (DTO)
	"backend/model"          //contiene las estructuras de datos que representan los modelos de usuario, dirección, número de teléfono,
	e "backend/utils/errors" //contiene el paquete errors
	
)

type userService struct{}

type userServiceInterface interface {
	 /*userServiceInterface que contiene los métodos que deben ser
	  implementados por el servicio de usuario. La interfaz userServiceInterface especifica los métodos
	que deben estar presentes en cualquier implementación del servicio de usuario*/

	GetUserById(id int) (dto.UserDetailDto, e.ApiError) 
	/*Recibe un ID de usuario como argumento y devuelve un dto.UserDetailDto que representa los detalles del
	 usuario correspondiente. También devuelve un posible  error de tipo e.ApiError*/
	GetUsers() (dto.UsersDto, e.ApiError) // lo mismo pero devulve todos los usuarios
	InsertUser(userDto dto.UserDto) (dto.UserDto, e.ApiError)
	//AddUserTelephone(telephoneDto dto.TelephoneDto) (dto.UserDetailDto, e.ApiError)
}

var (
	UserService userServiceInterface // se define la variable de tipo userServiceInterface
)

func init() {
	UserService = &userService{} //se inicia userService  para que apunte a una instancia de userService.
	// Esto permite que otros componentes de la aplicación utilicen UserService para acceder a los métodos
	//del servicio de usuario de manera consistente, independientemente de la implementación específica
	//del servicio que se utilice.
}

func (s *userService) GetUserById(id int) (dto.UserDetailDto, e.ApiError) { 
	//implementacion del metodo getuserbyid
	//El método recibe un ID de usuario como parámetro y devuelve un dto.UserDetailDto que contiene los detalles del
	//usuario solicitado. También puede devolver un error de tipo e.ApiError en caso de que el usuario no sea encontrado.

	var user model.User = userCliente.GetUserById(id) //comienza llamando a la función userCliente.GetUserById(id)
	// para obtener el modelo model.User correspondiente al ID proporcionado.
	var userDetailDto dto.UserDetailDto

	if user.Id == 0 { //si no enciuentra el usuario
		return userDetailDto, e.NewBadRequestApiError("user not found")
	}

	/* si lo encuentra  se copian los datos relevantes del modelo User al userDetailDto.
	Esto incluye el nombre, apellido, calle y número de la dirección del usuario. Además, se recorren los números
	de teléfono del usuario y se crea un dto.TelephoneDto para cada uno, copiando el código y el
	número del modelo al DTO. Estos DTO de teléfono se agregan al campo TelephonesDto de userDetailDto utilizando
	la función append.*/

		userDetailDto.Name = user.Name
		userDetailDto.LastName = user.LastName
		
		/*
	for _, telephone := range user.Telephones {
		var dtoTelephone dto.TelephoneDto
		dtoTelephone.Code = telephone.Code
		dtoTelephone.Number = telephone.Number

		userDetailDto.TelephonesDto = append(userDetailDto.TelephonesDto, dtoTelephone)
	} */

	/* se itera sobre cada usuario en la lista users. Para cada usuario, se crea un dto.UserDto y
	se copian los datos relevantes del modelo User al DTO. Esto incluye el nombre, apellido, nombre
	de usuario, ID, calle y número de la dirección del usuario. El DTO del usuario se agrega a la lista usersDto
	utilizando la función append*/

	return userDetailDto, nil
}

func (s *userService) GetUsers() (dto.UsersDto, e.ApiError) {

	var users model.Users = userCliente.GetUsers() //notar la s de diferencia.
	var usersDto dto.UsersDto

	/* se itera sobre cada usuario en la lista users. Para cada usuario, se crea un dto.UserDto y se copian los
	   datos relevantes del modelo User al DTO. 
	   El DTO del usuario se agrega a la lista usersDto utilizando la función append*/

	for _, user := range users {
		var userDto dto.UserDto
		userDto.Name = user.Name
		userDto.LastName = user.LastName
		userDto.UserName=user.UserName
		userDto.Password=user.Password
		userDto.Email=user.Email
		userDto.Id = user.Id
		userDto.Role=user.Role	
		userDto.Address = dto.AddressDto{
			Id:      user.Address.Id,
			UserId:  user.Address.UserId,
			Street:  user.Address.Street,
			Number:  user.Address.Number,
			City:    user.Address.City,
			Country: user.Address.Country,
		}
		
		usersDto = append(usersDto, userDto)
		//agrega un nuevo elemento a la lista userDto
	}

	return usersDto, nil
}


func (s *userService) InsertUser(userDto dto.UserDto) (dto.UserDto, e.ApiError) {

	var user model.User

	user.Name = userDto.Name
	user.LastName = userDto.LastName
	user.UserName = userDto.UserName
	user.Password = userDto.Password
    user.Email = userDto.Email
	user.Address= model.Address {
      Street: userDto.Address.Street,
	  Number: userDto.Address.Number,
	  City: userDto.Address.City,
	  Country: userDto.Address.Country,
	  UserId: user.Id,
	}

  // delegar la inserccion a la capa Cliente-DAO
	user , err := userCliente.InsertUser(user)

	if(err!=nil){
		//crea un error del tipo bad reques, esto coincide con 404 como estudiamos!
		ApiError:=e.NewBadRequestApiError(err.Error()) 
		// devolvemos un dto vacio{} ya que no puedo crearlo y el error
		return dto.UserDto{}, ApiError
	}

	userDto.Id = user.Id
	return userDto, nil
}

/*
func (s *userService) AddUserTelephone(telephoneDto dto.TelephoneDto) (dto.UserDetailDto, e.ApiError) {

	var telephone model.Telephone

	telephone.Code = telephoneDto.Code
	telephone.Number = telephoneDto.Number
	telephone.UserId = telephoneDto.UserId
	//Adding
	//telephone = telephoneCliente.AddTelephone(telephone)

	// Find User
	var user model.User = userCliente.GetUserById(telephoneDto.UserId)
	var userDetailDto dto.UserDetailDto

	userDetailDto.Name = user.Name
	userDetailDto.LastName = user.LastName

	return userDetailDto, nil   // agregado para que funcione
}
	/*
	userDetailDto.Street = user.Address.Street
	userDetailDto.Number = user.Address.Number
	for _, telephone := range user.Telephones {
		var dtoTelephone dto.TelephoneDto

		dtoTelephone.Code = telephone.Code
		dtoTelephone.Number = telephone.Number

		userDetailDto.TelephonesDto = append(userDetailDto.TelephonesDto, dtoTelephone)
	}

	return userDetailDto, nil
}*/

//visitar addressCliente, telephoneCliente y userCliente
