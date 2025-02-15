package dto

type TelephoneDto struct {
	Code   string `json:"code"`
	Number string `json:"number"`
	UserId int    `json:"user_id,omitempty"`
}

type TelephonesDto []TelephoneDto

/*Se define la estructura TelephoneDto que representa un DTO (Objeto de Transferencia de Datos) para un teléfono.
Tiene tres campos: Code, Number y UserId.
El campo Code representa el código del teléfono y se espera que sea una cadena de caracteres (string).
El campo Number representa el número de teléfono y se espera que sea una cadena de caracteres (string).
El campo UserId representa el ID del usuario asociado al teléfono y se espera que sea un entero (int).
Se utilizan las etiquetas json:"code", json:"number" y json:"user_id,omitempty" para especificar cómo s
e debe serializar y deserializar el DTO al formato JSON. Estas etiquetas indican los nombres de los campos
en JSON y también permiten que el campo UserId sea omitido si no tiene un valor asignado.*/
