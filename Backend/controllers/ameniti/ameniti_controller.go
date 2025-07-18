package amenitiController

import (
	"backend/dto"
    service "backend/services"
	"net/http"
	//"fmt"
	//"time"
	"strconv"
	"github.com/gin-gonic/gin"
    log "github.com/sirupsen/logrus"
)


func InsertNewAmenity(c *gin.Context){
	 var amenitiDto dto.AmenitiDto
	 err := c.BindJSON(& amenitiDto) 
	
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
    amenitiDto,er := service.AmenitiService.InsertNewAmenity(amenitiDto)
	if er != nil {
		c.JSON(er.Status(), er)
		return
	}
	c.JSON(http.StatusCreated, amenitiDto)
}


func GetAmenities(c *gin.Context){
	var amenitiesDto dto.AmenitiesDto 
	amenitiesDto, er := service.AmenitiService.GetAmenities()

	if er != nil {
		c.JSON(er.Status(), er)
		return
	}
	c.JSON(http.StatusOK, amenitiesDto)
}


func UpdateAmenities(c *gin.Context){
idParam, err := strconv.Atoi(c.Param("id"))
if err != nil {
  c.JSON(http.StatusBadRequest, "ID inválido")
  return
}

    var amenitiDto dto.AmenitiDto

  	err = c.BindJSON(&amenitiDto)
		if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
     amenitiDto.Id=idParam
	  er := service.AmenitiService.UpdateAmenities(amenitiDto)

		if er != nil {
		c.JSON(er.Status(), er)
		return
	}

	c.JSON(http.StatusOK, amenitiDto)
}


func DeleteAmenities(c *gin.Context){
	idParam, err := strconv.Atoi(c.Param("id"))
if err != nil {
  c.JSON(http.StatusBadRequest, "ID inválido")
  return
}

    var amenitiDto dto.AmenitiDto

     amenitiDto.Id=idParam
	  er := service.AmenitiService.DeleteAmeniti(amenitiDto)

		if er != nil {
		c.JSON(er.Status(), er)
		return
	}

	c.JSON(http.StatusOK, amenitiDto)
}
