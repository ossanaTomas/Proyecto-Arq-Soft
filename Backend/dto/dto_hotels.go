package dto

type HotelDto struct {
	Id          int              `json:"id"`
	Name        string           `json:"name"`
	Description string           `json:"description"`
	Rooms       int              `json:"rooms"`
	Imagenes    ImagenesDto        `json:"imagenes"`  //slices, de imagenes y de amenities
	Amenities   AmenitiesDto     `json:"amenities"` 
}


type HotelsDto []HotelDto

