package services

import (
	//addressCliente "mvc-go/clients/address"
	//telephoneCliente "mvc-go/clients/telephone"
	hotelCliente "backend/clients-DAO/hotel"

	//"mvc-go/clients-DAO/address"
	"backend/dto"            //contienelas estructuras de datos de transferencia de objetos (DTO)
	"backend/model"          //contiene las estructuras de datos que representan los modelos de usuario, dirección, número de teléfono,
	e "backend/utils/errors" //contiene el paquete errors
	//"time"
)

type hotelService struct{}

type hotelServiceIterface interface {
	GetHotels() (dto.HotelsDto, e.ApiError)
	InsertHotel(hotelDto dto.HotelDto) (dto.HotelDto, e.ApiError)

	InsertNewAmenity(amenitiDto dto.AmenitiDto)(dto.AmenitiDto, e.ApiError)
	GetAmenities()(dto.AmenitiesDto,e.ApiError)
}

var HotelService hotelServiceIterface

func init() {
	HotelService = &hotelService{}
}


func (s *hotelService) InsertHotel(hotelDto dto.HotelDto) (dto.HotelDto, e.ApiError) {
  
	var hotel model.Hotel

	hotel.Name= hotelDto.Name
	hotel.Description=hotelDto.Description
	hotel.Rooms=hotelDto.Rooms

	hotel.Imagenes = []model.Imagen{}
    hotel.Amenities = []model.Ameniti{}
	
	
	hotel, err := hotelCliente.InsertHotel(hotel)

	if err != nil {
		//crea un error del tipo bad reques, esto coincide con 404 como estudiamos!
		ApiError := e.NewBadRequestApiError(err.Error())
		// devolvemos un dto vacio{} ya que no puedo crearlo y el error
		return dto.HotelDto{}, ApiError
	}

	hotelDto.Id = hotel.Id
	return hotelDto, nil
}


func (s *hotelService) GetHotels() (dto.HotelsDto, e.ApiError) {
	var hotels model.Hotels = hotelCliente.GetHotels()
	var hotelsDto dto.HotelsDto

	for _, hotel := range hotels {
		var hotelDto dto.HotelDto
		hotelDto.Id = hotel.Id
		hotelDto.Name = hotel.Name
		hotelDto.Rooms = hotel.Rooms


		var amenityDtos []dto.AmenitiDto
		for _, amenity := range hotel.Amenities {
			amenityDto := dto.AmenitiDto{
				Name:        amenity.Name,
				Description: amenity.Description,
			}
			amenityDtos = append(amenityDtos, amenityDto)
		}
		var imagenesDto dto.ImagenesDto
		for _, imagen := range hotel.Imagenes {
			imagenDto := dto.ImagenDto{
				Url: imagen.Url,
				Id:  imagen.Id,
			}
			imagenesDto = append(imagenesDto, imagenDto)
		}

		hotelDto.Imagenes = imagenesDto
		hotelDto.Amenities = amenityDtos

		hotelsDto = append(hotelsDto, hotelDto)
	}

	return hotelsDto, nil
}


func(s *hotelService) InsertNewAmenity(amenitiDto dto.AmenitiDto)(dto.AmenitiDto, e.ApiError){
  
	existingAmenity,er := hotelCliente.FindAmenityByName(amenitiDto.Name)
	if existingAmenity.Id != 0 {
		return dto.AmenitiDto{}, e.NewBadRequestApiError("Amenity ya existe con ese nombre")
	}
	if er != nil{
        return dto.AmenitiDto{}, e.NewBadRequestApiError(er.Error())
	}

	var amenity model.Ameniti
	amenity.Name = amenitiDto.Name
	amenity.Description = amenitiDto.Description

	amenity, err := hotelCliente.InsertAmenity(amenity)
	if err != nil {
		return dto.AmenitiDto{}, e.NewBadRequestApiError(err.Error())
	}

	return amenitiDto, nil
}


func(s *hotelService) GetAmenities()(dto.AmenitiesDto,e.ApiError){
    
	var amenitiesDto dto.AmenitiesDto
	var amenities model.Amenities =hotelCliente.GetAmenities()
  
	for _, ameniti := range amenities{
	 var amenitiDto dto.AmenitiDto
	 amenitiDto.Id=ameniti.Id
	 amenitiDto.Name=ameniti.Name
	 amenitiDto.Description=ameniti.Description

	 amenitiesDto =append(amenitiesDto,amenitiDto)
	}
  
	return amenitiesDto, nil
}