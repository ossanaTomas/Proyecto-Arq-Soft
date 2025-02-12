package app

//la carpeta App cumple unicamente una funcion organizativa y agruupa componentes relacionados al enrrutamiento
// del proyecto 

import (
	"os"  
	log "github.com/sirupsen/logrus" // librería logrus es una biblioteca de logging (registro de logs) en Go.
)

// esto configura el sistema de logs
func init() {
	log.SetOutput(os.Stdout) //configura la salida de los logs para que se impriman en la consola (stdout). todos los logs generados se enviarán a la salida estándar (terminal),
	log.SetLevel(log.DebugLevel) //Se establece el nivel de log a debuglevel
	log.Info("Starting logger system") //muestra un mensaje de informacion en el log. 
}
