package services

import (
	//addressCliente "mvc-go/clients/address"
	//telephoneCliente "mvc-go/clients/telephone"
	amenitiCliente "backend/clients-DAO/ameniti"
    
	//"mvc-go/clients-DAO/address"
	"backend/dto"            //contienelas estructuras de datos de transferencia de objetos (DTO)
	 "backend/model"          //contiene las estructuras de datos que representan los modelos de usuario, dirección, número de teléfono,
	e "backend/utils/errors" //contiene el paquete errors
	//"time"
	"fmt"
)

type amenitiService struct{}

type amenitiServiceInterface interface {

	InsertNewAmenity(amenitiDto dto.AmenitiDto)(dto.AmenitiDto, e.ApiError)
	GetAmenities()(dto.AmenitiesDto,e.ApiError)
	UpdateAmenities(amenitiDto dto.AmenitiDto) ( e.ApiError)
	DeleteAmeniti(amenitiDto dto.AmenitiDto)(e.ApiError)
}

var AmenitiService amenitiServiceInterface

func init() {
	AmenitiService = &amenitiService{}
}

func(s *amenitiService) InsertNewAmenity(amenitiDto dto.AmenitiDto)(dto.AmenitiDto, e.ApiError){
  
	existingAmenity,er := amenitiCliente.FindAmenityByName(amenitiDto.Name)
	if existingAmenity.Id != 0 {
		return dto.AmenitiDto{}, e.NewBadRequestApiError("Amenity ya existe con ese nombre")
	}
	if er != nil{
        return dto.AmenitiDto{}, e.NewBadRequestApiError(er.Error())
	}

	var amenity model.Ameniti
	amenity.Name = amenitiDto.Name
	amenity.Description = amenitiDto.Description

	amenity, err := amenitiCliente.InsertAmenity(amenity)
	if err != nil {
		return dto.AmenitiDto{}, e.NewBadRequestApiError(err.Error())
	}

	return amenitiDto, nil
}


func(s *amenitiService) GetAmenities()(dto.AmenitiesDto,e.ApiError){
    
	var amenitiesDto dto.AmenitiesDto
	var amenities model.Amenities =amenitiCliente.GetAmenities()
  
	for _, ameniti := range amenities{
	 var amenitiDto dto.AmenitiDto
	 amenitiDto.Id=ameniti.Id
	 amenitiDto.Name=ameniti.Name
	 amenitiDto.Description=ameniti.Description

	 amenitiesDto =append(amenitiesDto,amenitiDto)
	}
  
	return amenitiesDto, nil
}



func(s *amenitiService)UpdateAmenities(amenitiDto dto.AmenitiDto) ( e.ApiError){
	Ameniti, err := amenitiCliente.GetAmenitiById(amenitiDto.Id) 
    if err != nil {
        return  e.NewBadRequestApiError("Ammeniti no encontrada")
    }
	Ameniti.Name=amenitiDto.Name
	Ameniti.Description=amenitiDto.Description

	 err = amenitiCliente.UpdateAmenities(Ameniti)
		if err != nil {
			fmt.Printf("el error es: %+v\n", err)
			return  e.NewBadRequestApiError("no se pudo actualizar la amenity")
		}
     return nil
}


func(s *amenitiService)DeleteAmeniti(amenitiDto dto.AmenitiDto) ( e.ApiError){

	err:=amenitiCliente.DeleteAmeniti(amenitiDto.Id)
	if err != nil {
			fmt.Printf("el error es: %+v\n", err)
			return  e.NewBadRequestApiError("no se pudo eliminar la amenity")
	}
     return nil
}


