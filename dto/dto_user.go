package dto
// ¿Que es un DTO?
//(Data Transfer Object) es un patrón de diseño utilizado para 
//transferir datos entre diferentes capas de una aplicación o entre aplicaciones distintas

type UserDto struct {
	Name     string `json:"name"`
	LastName string `json:"last_name"`
	UserName string `json:"user_name"`
	Password string `json:"password"`
	Role     string `json:"role"`
	Id       int    `json:"id"`

	Street string `json:"street_name"`
	Number int    `json:"street_number"`
}

type UsersDto []UserDto

