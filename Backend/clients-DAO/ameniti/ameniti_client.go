package ameniti

import (
	//"backend/dto"
	"backend/model" //importo del model
	"errors"

	//e "backend/utils/errors"
	//"fmt"
	"strings"

	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB


func GetAmenities() model.Amenities {
	var amenities model.Amenities
	Db.Find(&amenities)
	log.Debug("amenities: ", amenities)
	return amenities
}

func FindAmenityById(id int) model.Ameniti {
	var ameniti model.Ameniti
	Db.First(&ameniti, id)
	return ameniti
}

func GetAmenitiById(id int) (model.Ameniti, error) {
	var ameniti model.Ameniti //declaro varibale user del tipo model.user

	result := Db.Where("id = ?", id).First(&ameniti)
	if result.Error != nil {
		return model.Ameniti{}, errors.New("id inexistente")
	}
	log.Debug("hotel: ", ameniti)
	return ameniti, nil
}

func UpdateAmenities(ameniti model.Ameniti)(error){
   
	var existingAmenity model.Ameniti
	if err := Db.First(&existingAmenity, ameniti.Id).Error; err != nil {
		return  errors.New("id de ameniti inexistente")
	}
	// Actualizamos campos 
	existingAmenity.Description = ameniti.Description
	existingAmenity.Name = ameniti.Name
     // Guardamos cambios
	if err := Db.Save(&existingAmenity).Error; err != nil {
		return  errors.New("no se pudo guardar la ameniti")
	}
	return nil

}

func DeleteAmeniti(id int)(error){

    var ameniti model.Ameniti
	//busco
    if err := Db.First(&ameniti, id).Error; err != nil {
        return errors.New("no se encontro la ameniti")
    }
	//borro

	if err := Db.Delete(&ameniti).Error; err != nil {
		return errors.New("error al eliminar la ameniti")
	}
	return nil
/*
El siguiente enfoque funcionaria, pero si no encuentra un regiustro con ese Id, no daria ningun error
	if err := Db.Delete(&model.Ameniti{},id).Error; err != nil {
		return err
	}
	return nil*/
}

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
