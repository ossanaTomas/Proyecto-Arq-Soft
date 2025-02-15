package dto

type UserDetailDto struct {
	Name     string `json:"name"` // especificando etiquedas de esta manera permite especificar el nombre del campo que se usara para la serialización/deserialización JSON.
	LastName string `json:"last_name"`
	Street string `json:"street_name"`
	Number int    `json:"street_number"`

	TelephonesDto TelephonesDto `json:"telephones,omitempty"`
}
