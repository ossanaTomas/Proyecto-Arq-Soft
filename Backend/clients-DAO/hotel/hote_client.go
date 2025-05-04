package hotel

import (

	"backend/model" //importo del model
	"errors"

	"fmt"
	"strings"
    e "backend/utils/errors"
	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB

func GetHotels() model.Hotels { // no recibe paremetros y devuleveuna coleccion de usuarios
	var hotels model.Hotels
	err := Db.Preload("Amenities").Preload("Imagenes").Find(&hotels).Error
	if err != nil {
		log.Error("Error al obtener los hoteles con relaciones:", err)
		return model.Hotels{}
	}
	log.Debug("Hoteles con relaciones: ", hotels)
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
	 log.Debug("amenities: ",amenities)
	return amenities
}


func FindAmenityById(id int) model.Ameniti {
    var ameniti model.Ameniti
    Db.First(&ameniti, id)
    return ameniti
}

func InsertAmenitiesForHotel(hotel model.Hotel, amenityIDs []uint) e.ApiError {
	var amenities []model.Ameniti

	err := Db.Where("id IN (?)", amenityIDs).Find(&amenities).Error
	if err != nil {
		return e.NewInternalServerApiError("no se pudieron encontrar las amenities", err)
	}

	err = Db.Model(&hotel).Association("Amenities").Append(amenities).Error
	if err != nil {
		return e.NewInternalServerApiError("no se pudieron asociar las amenities", err)
	}

	return nil
}