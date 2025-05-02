package dto

type ImagenDto struct {
	Url string `json:"url"`
	Id int `json:"id"`
}

type ImagenesDto []ImagenDto