package dto

type AddressDto struct {
	Id      int    `json:"Adress_id"`
	UserId  int    `json:"User_id"` // Clave foránea
	Street  string `json:"Street"`
	Number  int    `json:"Number"`
	City    string `json:"City"`
	Country string `json:"Country"`
}

type AdressesDto []AdressesDto
