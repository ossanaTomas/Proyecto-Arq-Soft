package dto

type HotelDto struct {
	Id          int              `json:"id"`
	Name        string           `json:"name"`
	Description string           `json:"description"`
	Rooms       int              `json:"rooms"`
	Imagenes    ImagenesDto      `json:"imagenes"`  //slices, de imagenes y de amenities
	Amenities   []uint           `json:"amenities"` // ista de ids de amenities seleccionadas
}


type HotelsDto []HotelDto


type HotelResponseDto struct {
	Id          int              `json:"id"`
	Name        string           `json:"name"`
	Description string           `json:"description"`
	Rooms       int              `json:"rooms"`
	Imagenes    ImagenesDto      `json:"imagenes"`  //slices, de imagenes y de amenities
	Amenities   AmenitiesDto           `json:"amenities"` // ista de ids de amenities seleccionadas
}

type HotelsResponseDto []HotelResponseDto