package dto
// ¿Que es un DTO?
//(Data Transfer Object) es un patrón de diseño utilizado para 
//transferir datos entre diferentes capas de una aplicación o entre aplicaciones distintas

type UserDto struct {
	Name     string `json:"name"`
	LastName string `json:"last_name"`
	UserName string `json:"user_name"`
	Password string `json:"password"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	Address  AddressDto `json:"Address"`
	Id       int    `json:"id"`

}

type UsersDto []UserDto

