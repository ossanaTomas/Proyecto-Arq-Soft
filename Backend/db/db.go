package db

import (
	addressClient "backend/clients-DAO/address"
	amenitiClient "backend/clients-DAO/ameniti"
	hotelClient "backend/clients-DAO/hotel"
	reservClient "backend/clients-DAO/reserv"
	

	//telephoneClient "mvc-go/clients/telephone"
	userClient "backend/clients-DAO/user"
	"backend/model"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	log "github.com/sirupsen/logrus"
)



var ( //declaro estas varibles, db de tipo gorm.db y err de tipo error
	db  *gorm.DB
	err error
)

func init() { // init() que se ejecuta durante la inicialización del paquete.
	// DB Connections Paramters, se establecen los aparametros de coneccion a la base de datos
	DBName := "hotel_V2"
	DBUser := "root"
	DBPass := ""
	//DBPass := os.Getenv("MVC_DB_PASS")
	DBHost := "127.0.0.1"
	// ------------------------

	db, err = gorm.Open("mysql", DBUser+":"+DBPass+"@tcp("+DBHost+":3306)/"+DBName+"?charset=utf8&parseTime=True&loc=Local")
	//gorm.open para establecer la coneccion utilizando los parametros de coneccion

	if err != nil {
		log.Info("Connection Failed to Open")
		log.Fatal(err)
	} else {
		log.Info("Connection Established")
	}

	// We need to add all CLients that we build
	//Se asigna la conexión db a las variables Db de los clientes (userClient.Db, addressClient.Db, telephoneClient.Db).
	//Esto permite que los clientes utilicen la conexión a la base de datos para realizar operaciones.
	userClient.Db = db
	addressClient.Db = db
	hotelClient.Db=db
	amenitiClient.Db=db
	reservClient.Db=db
//	telephoneClient.Db = db


//cada una de las lineas anteriores pasa una instancia de conexion a los paquetes,
//inicializando la varibale declara en estos como db
}

func StartDbEngine() {
	// We need to migrate all classes model.
	// se encarga de realizar la migración de las tablas del modelo a la base de datos.

	db.AutoMigrate(&model.User{})
	// db.AutoMigrate(&model.Telephone{}) no existe
    db.AutoMigrate(&model.Address{})
	db.AutoMigrate(&model.Hotel{})
	db.AutoMigrate(&model.Imagen{})
	db.AutoMigrate(&model.Ameniti{})
	db.AutoMigrate(&model.Reserv{})

	
	
	log.Info("Finishing Migration Database Tables")

	/*Se define una función StartDbEngine() que se encarga de realizar la migración de las tablas del modelo
	a la base de datos. Utilizando db.AutoMigrate(), se migran las estructuras de datos del modelo User,
	Address y Telephone a las correspondientes tablas en la base de datos.*/

}

/*el código establece la conexión a la base de datos MySQL y configura los clientes para utilizar esta conexión.
También proporciona una función para realizar la migración de las tablas del modelo a la base de datos.*/


func TestConnection() {
	if err := db.DB().Ping(); err != nil {
		log.Error("Error al conectar con la base de datos:", err)
	} else {
		log.Info("Conexión a la base de datos verificada exitosamente")
	}
}