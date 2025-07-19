package dto

import "time"

type ReservDto struct {
	Id         int      `json:"id"`
	UserId     int       `json:"user_id"`
	User       string     `json:"user_name"`
	HotelId    int        `json:"hotel_id"`
	Hotel      string     `json:"hotel_name"`
	DateActual time.Time  `json:"date_actual"`
	DateStart  time.Time  `json:"date_start"`
	DateFinish time.Time  `json:"date_finish"`
	HotelRooms int        `json:"hotel_rooms"`
    //State      string     `json:"state"`
	TotalPrice float32    `json:"total_price"`
}

type ReservsDto []ReservDto