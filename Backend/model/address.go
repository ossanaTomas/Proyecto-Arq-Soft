 package model

type Address struct {
	Id      int    `gorm:"primaryKey"`
	UserId  int    `gorm:"not null;foreignKey:UserId;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;unique" `
	Street  string `gorm:"type:varchar(350);not null"`
	Number  int    `gorm:"type:int;not null"`
	City    string  `gorm:"type:varchar(350);not null"`
	Country string  `gorm:"type:varchar(100)"`
}

type Addresses []Address

//similar a user.go
