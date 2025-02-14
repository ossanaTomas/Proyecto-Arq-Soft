package model

type Imagen struct {
	ID          int      `gorm:"primaryKey; not null;AUTO_INCREMENT; unique"`
	Url       string    `gorm:"type:varchar(550);not null"`
	HotelId   int
}

type Imagenes []Imagen
