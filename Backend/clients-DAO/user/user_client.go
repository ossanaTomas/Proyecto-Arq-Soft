package product

import (
	"errors"
	"mvc-go/model" //importo del model
	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
	"strings"
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


func InsertUser(user model.User) (model.User, error) { //recibe un objeto model.user y devuelve un usuario insertado.
	result := Db.Create(&user)

	if result.Error != nil {
		// si el mensaje de error contiene duplicate entry:
		if strings.Contains(result.Error.Error(), "Duplicate entry") {
			//es por que una de las llaves ya existe
            log.Error("Usuario o Email Ya existentes")
        return model.User{}, errors.New("usuario o email ya existentes")
		}
		//si el error no es por duplicado
		log.Error("Error al crear el usuario:", result.Error)
        return model.User{}, result.Error
	}

	log.Debug("User Created: ", user.Id)
	return user, nil
}

// Aca agrego una breve explicacion de como realizar las operaciones CRUD con GORM
//-insertar datos: 
//Para insertar un nuevo dato se utiliza el metodo create(), donde recibe como parametro 
// un puntero a la estructura que se necesite.GORM gestiona automaticamente 
//-Leer datos:
//Se tiene tres sentencias, FIND, FiRST y Where
//Find:obtiene todos los registros de una tabla 
//First: Obtiene el primer registro que coincide con la consulta.
//Where: Permite realizar consultas más específicas con condiciones.
//-Actualizar Datos :
//Save: Actualiza el registro en la base de datos si ya existe (basado en la clave primaria).
//Updates: Permite actualizar solo los campos que cambian
//Borrar datos: 
//Db.Delete(&user, id): Elimina el registro de la tabla User donde el ID coincida con id.	

// el uso de PRELOAD en ciertas consultas se utiliza para cargar relaciones de manera anticipada 
// util cuando se necesita obtener datos relacionados en una sola consulta, en lugar de hacer consultas 
// adicionales posteriormente 
// Con preload GORM ejecutara algo como lo siguiente: 
//SELECT * FROM users WHERE id = ?;  -- Obtiene el usuario
//SELECT * FROM addresses WHERE user_id = ?;  -- Carga la dirección del usuario
//SELECT * FROM telephones WHERE user_id = ?;  -- Carga los teléfonos del usuario