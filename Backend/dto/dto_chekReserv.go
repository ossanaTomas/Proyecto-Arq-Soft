package dto

import "time"


type CheckAvailabilityDto struct{
	HotelId    int        `json:"hotel_id"`
	DateStart  time.Time  `json:"date_start"`
	DateFinish time.Time  `json:"date_finish"`
	Personas    int        `json:"personas"`
	Avaliable  bool       `json:"avaliable"`
}

type CheckAvailabilitesDto []CheckAvailabilityDto

//para obtener los hoteles que estan disponibles en cierto rango de fechas con tantas habitaciones lo que requiero es
// obtener los ids de esos hoteles y luego responder esos hoteles en cuestion
// tambien podria responder la cantidad de habitaciones disponibles de cada uno de ellos

//Estos los defino asi para poder utilizar lo que es shouldBinQuerry
type RequesthHotelsAvaibylityDto struct {
	DateStart  time.Time `form:"date_start" binding:"required" time_format:"2006-01-02"`
	DateFinish time.Time `form:"date_finish" binding:"required" time_format:"2006-01-02"`
	Personas   int       `form:"personas" binding:"required"`
}

type ResponseHotelAvaibylityDto struct{
	DateStart  time.Time  `json:"date_start"`
	DateFinish time.Time  `json:"date_finish"`
    RoomsAvaliable       int      `json:"rooms_avaiable"`
	Id          int              `json:"id"`
	Name        string           `json:"name"`
	Description string           `json:"description"`
	Rooms       int              `json:"rooms"`
	Imagenes    ImagenesDto      `json:"imagenes"`  //slices, de imagenes y de amenities
	Amenities   AmenitiesDto           `json:"amenities"` // ista de ids de amenities seleccionadas
}

type ResponseHotelsAvaibylityDtos []ResponseHotelAvaibylityDto