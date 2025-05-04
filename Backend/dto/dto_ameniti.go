package dto

type AmenitiDto struct {
	Id          int      `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
}


type AmenitiesDto []AmenitiDto