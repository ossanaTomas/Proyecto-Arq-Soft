package reservController

import (
	"backend/dto"
    service "backend/services"
	"net/http"
	"fmt"
	//"time"
	 "strconv"
	"github.com/gin-gonic/gin"
    log "github.com/sirupsen/logrus"
)


func InsertRerserv(c *gin.Context){
var reservDto dto.ReservDto
   err := c.BindJSON(&reservDto) 
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
    reservDto,er:= service.ReservService.InsertRerserv(reservDto)

	if er !=nil{	
		c.JSON(er.Status(), er)
		return
	}
	
	c.JSON(http.StatusCreated, reservDto)
}

func CheckDisponibility(c *gin.Context){
 var dispoInfoDto dto.CheckAvailabilityDto
  
   err := c.BindJSON(&dispoInfoDto) 
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
    fmt.Println(dispoInfoDto.HotelId)

	dispoInfoDto,er := service.ReservService.CheckAvailability(dispoInfoDto)

	if er != nil {
         fmt.Println("error aca2")
	   c.JSON(er.Status(), er)
		return
	}
	c.JSON(http.StatusAccepted, dispoInfoDto)
}

func UpdateReserv(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		log.Error("ID inválido: " + err.Error())
		c.JSON(http.StatusBadRequest, "El ID debe ser un número válido")
		return
	}

	var reservDto dto.ReservDto
	err = c.BindJSON(&reservDto) 
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	updatedDto, errApi := service.ReservService.UpdateReserv(id, reservDto)
	if errApi != nil {
		c.JSON(errApi.Status(), errApi)
		return
	}

	c.JSON(http.StatusOK, updatedDto)
}




func DeleteReserv(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		log.Error("ID inválido: " + err.Error())
		c.JSON(http.StatusBadRequest, "El ID debe ser un número")
		return
	}

	errApi := service.ReservService.DeleteReserv(id)
	if errApi != nil {
		c.JSON(errApi.Status(), errApi)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Reserva eliminada correctamente"})
}

func GetReservs(c *gin.Context){

  var reservs dto.ReservsDto
  reservs,err:= service.ReservService.GetReservs()

  if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, reservs)
}

