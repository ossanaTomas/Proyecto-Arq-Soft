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
	GetHotels() (dto.HotelsResponseDto, e.ApiError)
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
	

	var imagenesModel model.Imagenes
	for _, imagen := range hotelDto.Imagenes {
		imagenModel := model.Imagen{
			Url: imagen.Url,
		}
	 imagenesModel = append(imagenesModel, imagenModel)
	}
	hotel.Imagenes = imagenesModel


	savedHotel, err := hotelCliente.InsertHotel(hotel)
	if err != nil {
		return dto.HotelDto{}, e.NewBadRequestApiError(err.Error())
	}

	if len(hotelDto.Amenities) > 0 {
		err := hotelCliente.InsertAmenitiesForHotel(savedHotel, hotelDto.Amenities)
		if err != nil {
			return dto.HotelDto{}, err
		}
	}

	hotelDto.Id = savedHotel.Id
	return hotelDto, nil
}


func (s *hotelService) GetHotels() (dto.HotelsResponseDto, e.ApiError) {
	var hotels model.Hotels = hotelCliente.GetHotels()
	var hotelsDto dto.HotelsResponseDto

	for _, hotel := range hotels {
		var hotelDto dto.HotelResponseDto
		hotelDto.Id = hotel.Id
		hotelDto.Name = hotel.Name
		hotelDto.Description=hotel.Description
		hotelDto.Rooms = hotel.Rooms


		var amenityDtos []dto.AmenitiDto
		for _, amenity := range hotel.Amenities {
			amenityDto := dto.AmenitiDto{
				Id: amenity.Id,
				Name:        amenity.Name,
				Description: amenity.Description,
			}
			amenityDtos = append(amenityDtos, amenityDto)
		}
		var imagenesDto []dto.ImagenDto
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