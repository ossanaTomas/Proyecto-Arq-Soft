package product

import (
	"mvc-go/model" //importo del model
	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB

func GetUserById(id int) model.User { // funcion que recibe Id y devuleve un objeto model.user
	var user model.User //declaro varibale user del tipo model.user

	Db.Where("id = ?", id).Preload("Address").Preload("Telephones").First(&user)

	//Utiliza Db para realizar una consulta en la base de datos utilizando el método Where, Preload y
	//First de gorm.DB. La consulta busca un usuario con el ID especificado y carga sus relaciones
	//"Address" y "Telephones".
	//el resultado se le asigna a la varibale user.

	log.Debug("User: ", user) // mensaje de depuracion

	return user
}

func GetUsers() model.Users { // no recibe paremetros y devuleveuna coleccion de usuarios
	var users model.Users
	Db.Preload("Address").Find(&users)

	log.Debug("Users: ", users)

	return users
}

func InsertUser(user model.User) model.User { //recibeun objeto model.user y devuelve un usuario insertado.
	result := Db.Create(&user)

	if result.Error != nil {
		//TODO Manage Errors
		log.Error("")
	}
	log.Debug("User Created: ", user.Id)
	return user
}

//ir a model/user.go
