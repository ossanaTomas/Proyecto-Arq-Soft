package hotelControler

import (
	"backend/dto"
	service "backend/services"
	"fmt"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"net/http"
	"strconv"
	"time"
)

func GetHotels(c *gin.Context) {

	var hotelsDto dto.HotelsResponseDto
	hotelsDto, err := service.HotelService.GetHotels()

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, hotelsDto)
}

func GetHotel(c *gin.Context) {
	idParam, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	var hotelDto dto.HotelResponseDto
	hotelDto, er := service.HotelService.GetHotel(idParam)

	if er != nil {
		c.JSON(http.StatusBadRequest, er.Error())
		return
	}
	c.JSON(http.StatusOK, hotelDto)
}

func InsertHotel(c *gin.Context) {

	var hotelDto dto.HotelDto
	err := c.BindJSON(&hotelDto)

	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	hotelDto, er := service.HotelService.InsertHotel(hotelDto)

	if er != nil {
		c.JSON(er.Status(), er)
		return
	}

	c.JSON(http.StatusCreated, hotelDto)

}

func UpdateHotel(c *gin.Context) {
	idParam, _ := strconv.Atoi(c.Param("id"))
	var hotelDto dto.HotelDto

	err := c.BindJSON(&hotelDto)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	hotelDto.Id = idParam
	hotelDto, er := service.HotelService.UpdateHotel(hotelDto)

	if er != nil {
		c.JSON(er.Status(), er)
		return
	}

	c.JSON(http.StatusOK, hotelDto)
}

func DeleteHotel(c *gin.Context) {
	idParamStr := c.Param("id")
	idParam, err := strconv.Atoi(idParamStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}
	hotelDto := dto.HotelDto{Id: idParam}
	if err := service.HotelService.DeleteHotel(hotelDto); err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "hotel eliminado exitosamente"})
}

func UploadImage(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No se pudo leer el archivo"})
		return
	}

	// Ruta donde guardar (creá esta carpeta si no existe)
	filename := fmt.Sprintf("uploads/img/hotels/%d_%s", time.Now().Unix(), file.Filename)
	err = c.SaveUploadedFile(file, filename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo guardar la imagen"})
		return
	}
	// Devolvés la URL relativa (que se guarda en el backend)
	c.JSON(http.StatusOK, gin.H{"url": "/" + filename})
}
