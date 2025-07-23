package reserv

import (
	//"backend/clients-DAO/reserv"
	"backend/dto"
	"backend/model" //importo del model
	"fmt"

	"errors"
	//"strings"
	//e "backend/utils/errors"
	"github.com/jinzhu/gorm"
	//log "github.com/sirupsen/logrus"
)

var Db *gorm.DB



func CheckAvailability(dtoConsulta dto.CheckAvailabilityDto) (dto.CheckAvailabilityDto, error) {
	var hotel model.Hotel
	

	err := Db.First(&hotel, dtoConsulta.HotelId).Error
	if err != nil {
		return dtoConsulta, errors.New("hotel inexistente")
	}

	var totalBookedRooms int64
	row := Db.Model(&model.Reserv{}).
		Select("COALESCE(SUM(hotel_rooms), 0)").
		Where("hotel_id = ? AND date_start <= ? AND date_finish >= ?", hotel.Id, dtoConsulta.DateFinish, dtoConsulta.DateStart).
		Row()

	err = row.Scan(&totalBookedRooms)
	if err != nil {
	
		return dtoConsulta, errors.New("error inesperado al consultar reservas")
	}

	if int(totalBookedRooms)+dtoConsulta.Personas <= hotel.Rooms {
		dtoConsulta.Avaliable = true
	} else {
		dtoConsulta.Avaliable = false
	}

	return dtoConsulta, nil
}

/*
func SearchAvaliabity(searchAvaliabity dto.RequesthHotelsAvaibylityDto)(model.Hotels,error){

    
}*/


func GetHotelesDisponibles(req dto.RequesthHotelsAvaibylityDto) ([]int, error) {
	var hotelesDisponibles []int

	// Traer todos los hoteles
	var hoteles []model.Hotel
	if err := Db.Find(&hoteles).Error; err != nil {
		return nil, errors.New("error al traer los hoteles")
	}

	// Para cada hotel, verificar disponibilidad
	for _, hotel := range hoteles {
		var totalReservadas int
        fmt.Println("aca llega, hotel id:", hotel.Id)
		// Suma de habitaciones reservadas en ese rango
		row := Db.Model(&model.Reserv{}).
	Select("COALESCE(SUM(hotel_rooms), 0)").
	Where("hotel_id = ? AND date_start <= ? AND date_finish >= ?", hotel.Id, req.DateFinish, req.DateStart).
	Row()

err := row.Scan(&totalReservadas)
        fmt.Println("reservas de hotel:", hotel.Id,"son", totalReservadas )
		if err != nil {
			return nil, errors.New("error al consultar reservas para hotel")
		}

		if int(totalReservadas)+req.Personas <= hotel.Rooms {
			hotelesDisponibles = append(hotelesDisponibles, int(hotel.Id))
		}
	}
	

	return hotelesDisponibles, nil
}




func GetAllReservsByHotel(id int)(model.Reservs,error){
	var reservs model.Reservs
	result:=Db.Where("hotel_id= ?", id).Find(&reservs)
	if result.Error!=nil{
		return reservs, errors.New("error al encontrar las reservas  historicas de este hotel")
	}
	return reservs,nil
}

func GetFutureReservsByHotel(reservDto dto.ReservDto)(model.Reservs,error){
	var reservs model.Reservs
	result:=Db.Where("hotel_id=? and AND date_finish >= ?", reservDto.HotelId,reservDto.DateFinish ).Find(&reservs)
	if result.Error!=nil{
		return reservs, errors.New("error al encontrar las reservas presentes de este hotel")
	}
	return reservs,nil
}

func GetAllReservsByUser(id int)(model.Reservs,error){
	var reservs model.Reservs
	result:=Db.Where("user_id= ?", id).Find(&reservs)
	if result.Error!=nil{
		return reservs, errors.New("error al encontrar las reservas historicas de este usuario")
	}
	return reservs,nil
}

func GetFuturesReservsByUser(id int)(model.Reservs,error){
	var reservs model.Reservs
	result:=Db.Where("user_id= ?", id).Find(&reservs)
	if result.Error!=nil{
		return reservs, errors.New("error al encontrar las reservas de este usuario")
	}
	return reservs,nil
}



func GetReservs()(model.Reservs,error){
  	var reservs model.Reservs
	result:=Db.Find(&reservs)
	if(result.Error!=nil){
		return  model.Reservs{}, errors.New("error al cargar las reservas")
	}
	return reservs, nil
}



func InsertReserv(reservData model.Reserv)(model.Reserv, error){
	result:=Db.Create(&reservData)
	if(result.Error!=nil){
		return model.Reserv{}, errors.New("error al crear la reserva")
	}
	return reservData, nil
}


func FindReservById(id int) (model.Reserv, error) {
	var reserv model.Reserv
	err := Db.First(&reserv, id).Error
	if err != nil {
		return model.Reserv{}, err
	}
	return reserv, nil
}

func UpdateReserv(updated model.Reserv) error {
	result := Db.Save(&updated)
	return result.Error
}


func DeleteReserv(id int) error {
	result := Db.Delete(&model.Reserv{}, id)
	if result.Error != nil {
		return errors.New("error al eliminar la reserva")
	}
	if result.RowsAffected == 0 {
		return errors.New("no se encontró una reserva con ese ID")
	}
	return nil
}