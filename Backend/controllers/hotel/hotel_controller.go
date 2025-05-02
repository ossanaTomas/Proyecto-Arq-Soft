package hotelControler

import (
	"backend/dto"
    service "backend/services"
	"net/http"
	 //"strconv"
	"github.com/gin-gonic/gin"
    log "github.com/sirupsen/logrus"
)



func GetHotels(c *gin.Context) { 

	var hotelsDto dto.HotelsDto 
	hotelsDto, err := service.HotelService.GetHotels()

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, hotelsDto)
}



func InsertHotel(c *gin.Context){
    
	var hotelDto dto.HotelDto
	err := c.BindJSON(&hotelDto) 
	
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
  
	hotelDto,er := service.HotelService.InsertHotel(hotelDto)

	if er != nil {
		c.JSON(er.Status(), er)
		return
	}
	
	c.JSON(http.StatusCreated, hotelDto)

}


func InsertNewAmenity(c *gin.Context){
	 var amenitiDto dto.AmenitiDto
	 err := c.BindJSON(& amenitiDto) 
	
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
  
    amenitiDto,er := service.HotelService.InsertNewAmenity(amenitiDto)

	if er != nil {
		c.JSON(er.Status(), er)
		return
	}
	
	c.JSON(http.StatusCreated, amenitiDto)
}



func GetAmenities(c *gin.Context){
	var amenitiesDto dto.AmenitiesDto 
	amenitiesDto, err := service.HotelService.GetAmenities()

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, amenitiesDto)
}


