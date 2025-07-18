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
	"fmt"
)

type hotelService struct{}

type hotelServiceInterface interface {
	GetHotels() (dto.HotelsResponseDto, e.ApiError)
	InsertHotel(hotelDto dto.HotelDto) (dto.HotelDto, e.ApiError)
	UpdateHotel(hotelDto dto.HotelDto) (dto.HotelDto, e.ApiError)
	DeleteHotel(hotelDto dto.HotelDto)(e.ApiError)

}

var HotelService hotelServiceInterface

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


func(s *hotelService)UpdateHotel( hotelDto dto.HotelDto) (dto.HotelDto, e.ApiError){
  
	hotel, err := hotelCliente.GetHotelById(hotelDto.Id) 
    if err != nil {
        return dto.HotelDto{}, e.NewBadRequestApiError("Hotel no encontrado")
    }

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


	 err = hotelCliente.UpdateAmenitiesForHotel(hotelDto, hotelDto.Amenities)
		if err != nil {
			fmt.Printf("el error es: %+v\n", err)
			return dto.HotelDto{}, e.NewBadRequestApiError("no se pudieron actualizar las amenities")
		}

	
    // Guardamos hotel actualizado
    updatedHotel, err := hotelCliente.UpdateHotel(hotel)
    if err != nil {
        return dto.HotelDto{}, e.NewBadRequestApiError("No se pudo actualizar hotel")
    }

    hotelDto.Id = updatedHotel.Id
    return hotelDto, nil
}




func (s *hotelService) DeleteHotel(hotelDto dto.HotelDto) e.ApiError {
	hotel, err := hotelCliente.GetHotelById(hotelDto.Id)
	if err != nil {
		return e.NewBadRequestApiError("Hotel no encontrado")
	}
	if err := hotelCliente.DeleteAmenitiesForHotel(hotelDto); err != nil {
		return e.NewInternalServerApiError("No se pudieron eliminar las amenities", err)
	}

	if err := hotelCliente.DeleteHotel(hotel); err != nil {
		return e.NewInternalServerApiError("No se pudo eliminar el hotel", err)
	}

	return nil
}
