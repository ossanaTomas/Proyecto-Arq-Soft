package model

type Imagen struct {
	Id       int    `gorm:"primaryKey"`
	Url      string  `gorm:"type:varchar(550);not null"`
	HotelId  int    `gorm:"index"` // FK
}

type Imagenes []Imagen
