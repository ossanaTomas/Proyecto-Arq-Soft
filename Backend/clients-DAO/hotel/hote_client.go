package hotel

import (
	"backend/dto"
	"backend/model" //importo del model
	"errors"

	e "backend/utils/errors"
	"fmt"
	"strings"

	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB

func GetHotels() model.Hotels {
	var hotels model.Hotels
	err := Db.Preload("Amenities").Preload("Imagenes").Find(&hotels).Error
	if err != nil {
		log.Error("Error al obtener los hoteles con relaciones:", err)
		return model.Hotels{}
	}
	log.Debug("Hoteles con relaciones: ", hotels)
	return hotels
}

func GetHotelById(id int) (model.Hotel, error) {
	var hotel model.Hotel //declaro varibale user del tipo model.user

	result := Db.Where("id = ?", id).Preload("Amenities").Preload("Imagenes").First(&hotel)
	if result.Error != nil {
		return model.Hotel{}, errors.New("id inexistente")
	}
	log.Debug("hotel: ", hotel)
	return hotel, nil
}



func GetHotelsById(ids []int) (model.Hotels, error) {
	var hotels model.Hotels

	if len(ids) == 0 {
		return model.Hotels{}, errors.New("la lista de IDs está vacía")
	}

	err := Db.Preload("Amenities").
		Preload("Imagenes").
		Where("id IN (?)", ids).
		Find(&hotels).Error

	if err != nil {
		log.Error("Error al obtener hoteles por IDs:", err)
		return model.Hotels{}, err
	}

	return hotels, nil
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

func InsertAmenity(amenity model.Ameniti) (model.Ameniti, error) {
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

func UpdateAmenitiesForHotel(hotel dto.HotelDto, amenityIDs []uint) e.ApiError {
	var hotelm model.Hotel
	if err := Db.First(&hotelm, hotel.Id).Error; err != nil {
		return e.NewInternalServerApiError("Hotel no encontrado", err)
	}
	// Limpiar asociaciones anteriores
	if err := Db.Model(&hotelm).Association("Amenities").Clear().Error; err != nil {
		return e.NewInternalServerApiError("No se pudieron limpiar las amenities", err)
	}
	// Si no hay nuevas, terminamos
	if len(amenityIDs) == 0 {
		return nil
	}
	// Buscar nuevas amenities
	  var amenities []model.Ameniti
	err := Db.Where("id IN (?)", amenityIDs).Find(&amenities).Error 
	if err != nil {
		return e.NewInternalServerApiError("No se pudieron obtener las amenities", err)
	}
	// Asignar nuevas
	if err := Db.Model(&hotelm).Association("Amenities").Append(amenities).Error; err != nil {
		return e.NewInternalServerApiError("No se pudieron asociar las nuevas amenities", err)
	}
	return nil
}



func UpdateHotel(hotel model.Hotel) (model.Hotel, error) {
	var existingHotel model.Hotel
	if err := Db.Preload("Imagenes").First(&existingHotel, hotel.Id).Error; err != nil {
		return model.Hotel{}, err
	}

	// Actualizamos campos simples
	existingHotel.Name = hotel.Name
	existingHotel.Description = hotel.Description
	existingHotel.Rooms = hotel.Rooms

	// Reemplazamos imágenes: primero las borramos
	if err := Db.Where("hotel_id = ?", hotel.Id).Delete(&model.Imagen{}).Error; err != nil {
		return model.Hotel{}, err
	}
	existingHotel.Imagenes = hotel.Imagenes

	// Guardamos cambios
	if err := Db.Save(&existingHotel).Error; err != nil {
		return model.Hotel{}, err
	}
	return existingHotel, nil
}

func DeleteHotel(hotel model.Hotel)(error){
	// elimina imágenes asociadas
	if err := Db.Where("hotel_id = ?", hotel.Id).Delete(&model.Imagen{}).Error; err != nil {
		return err
	}
	// eliminar el hotel
	if err := Db.Delete(&hotel).Error; err != nil {
		return err
	}
	return nil
}


func DeleteAmenitiesForHotel(hotel dto.HotelDto)(error) {
   	var hotelm model.Hotel
	if err := Db.First(&hotelm, hotel.Id).Error; err != nil {
		return e.NewInternalServerApiError("Hotel no encontrado", err)
	}
	//Borramos las amenities que tenia asociado cierto hotel
	if err := Db.Model(&hotelm).Association("Amenities").Clear().Error; err != nil {
		return e.NewInternalServerApiError("No se pudieron limpiar las amenities", err)
	}
	return nil
}
