package hotel

import (
	"errors"
	"backend/model" //importo del model
	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
	"strings"
	"fmt"
)

var Db *gorm.DB

func GetHotels() model.Hotels { // no recibe paremetros y devuleveuna coleccion de usuarios
	var hotels model.Hotels
	Db.Find(&hotels)
	log.Debug("Hoteles: ", hotels)

	return hotels
}


func InsertHotel(hotel model.Hotel) (model.Hotel, error){

	fmt.Printf("%+v\n", hotel)
	result:= Db.Create(&hotel)

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