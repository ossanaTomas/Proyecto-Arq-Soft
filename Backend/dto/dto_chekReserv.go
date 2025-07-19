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