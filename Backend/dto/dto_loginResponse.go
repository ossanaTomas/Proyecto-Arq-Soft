package dto

type LoginResponseDTO struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Token string `json:"tokend"`
}