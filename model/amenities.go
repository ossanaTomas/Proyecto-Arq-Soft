package model

type Ameniti struct {
	Id          int     `gorm:"primaryKey; not null;AUTO_INCREMENT; unique"`
	Name        string  `gorm:"type:varchar(350);not null"`
	Description string  `gorm:"type:varchar(1000);not null"`
	Hotels      []Hotel `gorm:"many2many:hotel_ameniti;"` // Relación muchos a muchos
}
