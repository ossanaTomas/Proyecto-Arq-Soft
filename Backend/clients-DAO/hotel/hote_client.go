package hotel

import (
	"backend/model" //importo del model
	"errors"

	"fmt"
	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
	"strings"
)

var Db *gorm.DB

func GetHotels() model.Hotels { // no recibe paremetros y devuleveuna coleccion de usuarios
	var hotels model.Hotels
	Db.Find(&hotels)
	log.Debug("Hoteles: ", hotels)
	return hotels
}

func InsertHotel(hotel model.Hotel) (model.Hotel, error) {

	fmt.Printf("%+v\n", hotel)
	result := Db.Create(&hotel)

	if result.Error != nil {
		if strings.Contains(result.Error.Error(), "Duplicate entry") {
			log.Error("Hotel Ya existentes")
			return model.Hotel{}, errors.New("usuario o email ya existentes")
		}
		//si el error no es por duplicado
		log.Error("Error al crear el hotel", result.Error)
		return model.Hotel{}, result.Error
	}

	log.Debug("Hotel Created: ", hotel.Id)
	return hotel, nil

}



//la logica de consultas de amenities las trabajo en conjunto con la hoteles
//dado que estas estan muy de la mano

func FindAmenityByName(name string) (model.Ameniti, error) {
	var ameniti model.Ameniti
	result := Db.Where("name = ?", name).First(&ameniti)
	if result.Error != nil {
		if result.RecordNotFound() {
			// No existe la amenity, devolvemos un modelo vacío y sin error
			return model.Ameniti{}, nil
		}
		// Hubo un error real en la consulta
		return model.Ameniti{}, result.Error
	}
	return ameniti, nil
}


func InsertAmenity(amenity model.Ameniti)(model.Ameniti, error){
	result := Db.Create(&amenity)

	if result.Error != nil {
		if strings.Contains(result.Error.Error(), "Duplicate entry") {
			log.Error("Amenity Ya existente")
			return model.Ameniti{}, errors.New("amenity ya existe")
		}
		//si el error no es por duplicado
		log.Error("Error al insertar la amenity", result.Error)
		return model.Ameniti{}, result.Error
	}

	log.Debug("Amenity creada ", amenity.Id)
	return amenity, nil

}

func GetAmenities() (model.Amenities){
	var amenities model.Amenities
     Db.Find(&amenities)


	return amenities
}