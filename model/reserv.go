package model

import "time"

type Reserv struct {
	Id         int    `gorm:"type:int ; primaryKey; not null;AUTO_INCREMENT; unique"`
	UserId     int    `gorm:"type:int; foreignKey:UserId; not null"`
	HotelId    int    `gorm:"type:int; foreignKey:HotelId ; not null"`
	DateActual time.Time  `gorm:"type:datetime;not null"`
	DateStart  time.Time `gorm:"type:datetime;not null"`
	DateFinish time.Time `gorm:"type:datetime;not null"`
	HotelRooms int    `gorm:"type:int;not null"`
}

type Reservs []Reserv
