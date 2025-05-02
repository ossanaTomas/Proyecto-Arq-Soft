package model

type Ameniti struct {
	Id          int      `gorm:"primaryKey;autoIncrement"`
	Name        string   `gorm:"type:varchar(350);unique;not null"`
	Description string   `gorm:"type:varchar(1000);not null"`
	Hotels      []Hotel  `gorm:"many2many:hotel_ameniti"`
}

type Amenities []Ameniti