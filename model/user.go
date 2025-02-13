package model

type User struct { //se define la estructura user que representaun modelo de datos para un usuario en el sistema
	Id       int    `gorm:"primaryKey; not null;AUTO_INCREMENT; unique"`                 // se configura como la clave primaria en la base de datos
	Name     string `gorm:"type:varchar(350);not null"` // cadena de caracteres string con ciertas restrigciones
	LastName string `gorm:"type:varchar(250);not null"`
	UserName string `gorm:"type:varchar(150);not null;unique"`
	Password string `gorm:"type:varchar(150);not null"`
	Email    string `gorm:"type:varchar(255);not null;unique"`
	Role     string `gorm:"type:enum('user', 'admin') DEFAULT 'user'(150);not null"`
	//Address Address `gorm:"foreignkey:AddressId"` //La etiqueta gorm:"foreignkey:AddressId" indica que la clave
	// externa AddressId en la tabla de usuarios está relacionada con la clave primaria Id de la tabla de direcciones.
	// AddressId int
	

	//El campo Telephones representa la relación entre un usuario y varios teléfonos. Se utiliza la estructura
	//Telephones definida en el mismo paquete model. La etiqueta gorm:"foreignKey:UserId" indica que la clave
	//externa UserId en la tabla de teléfonos está relacionada con la clave primaria Id de la tabla de usuarios.
}

type Users []User  // ESTO ES UN SLICE DE STRUCTS , Este tipo te permite trabajar con múltiples instancias de User de una manera más semántica y organizada.

