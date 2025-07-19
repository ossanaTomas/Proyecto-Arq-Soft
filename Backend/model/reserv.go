package model

import "time"

type Reserv struct {
	Id         int       `gorm:"primaryKey;autoIncrement"`
	UserId     int        `gorm:"type:int; foreignKey:UserId; not null"` // FK a User
	User       User      // Relación N:1
	HotelId    int       `gorm:"type:int; foreignKey:HotelId ; not null"`
	Hotel      Hotel     // Relación N:1
	CreatedAt  time.Time  `gorm:"type:datetime;not null"`
	UpdatedAt  time.Time
	DateStart  time.Time  `gorm:"type:datetime;not null"`
	DateFinish time.Time   `gorm:"type:datetime;not null"`
	HotelRooms int         `gorm:"type:int;not null"`
  //State      string    `gorm:"type:enum('pending','confirm','canceled','finish');default:'pending';not null"`
	TotalPrice float32    `gorm:"type:float;not null"`
}

type Reservs []Reserv
