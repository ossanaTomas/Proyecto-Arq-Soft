package model


type User struct { //se define la estructura user que representaun modelo de datos para un usuario en el sistema
	Id        int      `gorm:"primaryKey;not null;AUTO_INCREMENT;unique"`  // se configura como la clave primaria en la base de datos
	Name      string   `gorm:"type:varchar(150);not null"`
	LastName  string   `gorm:"type:varchar(150);not null"` // cadena de caracteres string con ciertas restrigciones
	UserName  string   `gorm:"type:varchar(30);not null;unique"`
	Password  string    `gorm:"type:varchar(255);not null;unique"`
	Email     string    `gorm:"type:varchar(255);not null;unique"`
	Role      string    `gorm:"type:enum('user', 'admin');default:'user';not null"`

	// Relaciones
	Address   Address   `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	//Telephones []Telephone `gorm:"foreignKey:UserId"`


		//El campo Telephones representa la relación entre un usuario y vario s teléfonos. Se utiliza la estructura
	//Telephones definida en el mismo paquete model. La etiqueta gorm:"foreignKey:UserId" indica que la clave
	//externa UserId en la tabla de teléfonos está relacionada con la clave primaria Id de la tabla de usuarios.
}

type Users []User