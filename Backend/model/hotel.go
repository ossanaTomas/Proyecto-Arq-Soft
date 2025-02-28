package model

type Hotel struct {
	Id          int       `gorm:"primaryKey; not null;AUTO_INCREMENT; unique"`
	Name        string    `gorm:"type:varchar(350);not null"`
	Description string    `gorm:"type:varchar(1000);not null"`
	Rooms       int       `gorm:"type:int;not null"`
	Imagenes    []Imagenes 
	Amenities   []Ameniti `gorm:"many2many:hotel_ameniti;"` // Relación muchos a muchos
}

type Hotels []Hotel
