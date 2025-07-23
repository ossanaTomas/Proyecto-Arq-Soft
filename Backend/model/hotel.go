package model

type Hotel struct {
	Id          int      `gorm:"primaryKey;autoIncrement"`
	Name        string   `gorm:"type:varchar(350);not null"`
	Description string   `gorm:"type:varchar(1000);not null"`
	Rooms       int      `gorm:"type:int;not null"`

	// Relaciones
	Imagenes  []Imagen  `gorm:"foreignKey:HotelId"`
	Amenities []Ameniti `gorm:"many2many:hotel_ameniti"`
}

type Hotels []Hotel
