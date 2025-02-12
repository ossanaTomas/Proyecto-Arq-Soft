package address

import (
	"mvc-go/model"

	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB //varibale Dv objeto de tipo gorm.db, representa conexion a la base de datos

func GetAddressById(id int) model.Address {
	var address model.Address

	//ecibe un ID de dirección y busca en la base de datos la dirección correspondiente.
	//Utiliza el objeto Db (un objeto gorm.DB) para ejecutar una consulta en la base de datos y recuperar
	//la dirección con el ID especificado. Luego, devuelve la dirección encontrada

	Db.Where("id = ?", id).First(&address) //consulta que busca el id espesifico
	log.Debug("Address: ", address)
	// el resuktado de la consulta se le asigna a la variable address
	return address // se devulve la direccion encontrada.
}

func InsertAddress(address model.Address) model.Address {
	// recibe un objeto model.Address como parámetro y devuelve la dirección insertada.

	result := Db.Create(&address) // operacion de incercion en la base de datos, utilizando create de gorm.
	//se pasa como referencia la &adress para que los cambios realizados durante la insercion se reflejen en el objeto.

	if result.Error != nil {
		//TODO Manage Errors
		log.Error("")
	}
	log.Debug("Address Created: ", address.Id)
	return address //finalmente se devuleve la direccion insertada
}
