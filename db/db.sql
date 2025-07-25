-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: hotel
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `street` varchar(350) NOT NULL,
  `number` int(11) NOT NULL,
  `city` varchar(350) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amenitis`
--

DROP TABLE IF EXISTS `amenitis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amenitis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(350) NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenitis`
--

LOCK TABLES `amenitis` WRITE;
/*!40000 ALTER TABLE `amenitis` DISABLE KEYS */;
INSERT INTO `amenitis` VALUES (5,'pileta','gran pileta con calefaccion potente'),(6,'Gimnasio y cinta','Cinta, musculacion y mucho mas'),(7,'Bebidas de cortesia','Gran cantidad de bebidas para que pueda disfrutar y relajarse'),(8,'Desayuno Buffet','Un gran desayuno para que arranques bien el dia'),(9,'Baño privado','Baño privado'),(10,'WI-FI','servicio de coneccion a internet en todas las habitaciones'),(11,'Servicio de guias','Los guias los acompañaran en las distintas actividades y recorridos'),(12,'Piano en vivo','musica clasica, artistas en vivo al ritmode un piano relajante'),(13,'Piscina olimpica','Gran pileta de natacion'),(14,'Cochera Privada','Deje su vehiculo tranquilo y descanse en nuestras instalaciones!'),(15,'Sauna','vapor aromatico para la piel');
/*!40000 ALTER TABLE `amenitis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel_ameniti`
--

DROP TABLE IF EXISTS `hotel_ameniti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotel_ameniti` (
  `hotel_id` int(11) NOT NULL,
  `ameniti_id` int(11) NOT NULL,
  PRIMARY KEY (`hotel_id`,`ameniti_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel_ameniti`
--

LOCK TABLES `hotel_ameniti` WRITE;
/*!40000 ALTER TABLE `hotel_ameniti` DISABLE KEYS */;
INSERT INTO `hotel_ameniti` VALUES (1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(2,6),(2,7),(2,10),(2,13),(2,14),(3,5),(3,6),(3,7),(3,8),(3,9),(3,10),(3,11),(3,13),(4,5),(4,6),(4,7),(4,8),(4,9),(5,10),(5,11),(5,14),(5,15),(6,5),(6,6),(6,7),(7,5),(7,6),(7,7),(8,5),(8,6),(8,7),(9,5),(9,6),(9,7),(10,6),(10,7),(10,8),(10,9),(10,10),(10,11),(11,7),(11,9),(11,10),(11,13),(12,8),(12,9),(12,10),(13,8),(13,14),(13,15),(14,6),(14,7),(14,9),(14,12);
/*!40000 ALTER TABLE `hotel_ameniti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(350) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `rooms` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (1,'Hotel California','Ubicado en un rincón remoto del desierto de Mojave, el Hotel California emerge como una visión surrealista entre dunas doradas y cielos infinitos, inspirado en la misteriosa aura de la canción homónima de los Eagles. Este hotel boutique, construido con adobe y vidrio tintado, parece un espejismo arquitectónico que combina el encanto retro de los años 70 con un toque de decadencia glamurosa. Las suites están decoradas con muebles de terciopelo, lámparas de araña polvorientas y paredes adornadas con retratos antiguos, evocando la sensación de un lugar atrapado en el tiempo donde los huéspedes se sumergen en una narrativa de lujo eterno. Al entrar, un vestíbulo iluminado por candelabros de bronce da la bienvenida con un aroma a incienso y jazmín, mientras un pianista toca melodías melancólicas que resuenan con los versos \"You can check out any time you like, but you can never leave\". El hotel cuenta con un bar subterráneo, el \"Mirage Lounge\", donde se sirven cócteles exóticos',20),(2,'Copacabana Palace Echo','Situado en una playa ficticia de la Costa Amalfi, el Copacabana Palace Echo captura el espíritu vibrante del icónico hotel de Rio, pero con un enfoque mediterráneo. Construido con azulejos coloridos y arcos blancos, este hotel refleja el encanto tropical del original, con terrazas que dan a un mar turquesa y jardines llenos de limoneros. Las habitaciones combinan la calidez brasileña con detalles italianos, como camas con dosel y mosaicos artesanales, mientras que los balcones ofrecen vistas a un carnaval perpetuo que se celebra en los jardines cada noche, un eco de las fiestas de Copacabana. El hotel alberga un restaurante de mariscos con samba en vivo y un bar en la azotea donde se sirven caipirinhas con un toque de limoncello, fusionando culturas. Un spa con saunas de vapor y un centro de danza ofrecen experiencias únicas, mientras que la piscina olímpica invita a nadar bajo el sol, recordando los días dorados del hotel carioca.',20),(3,'Grand Horizon Hotel','Nestled in the heart of a bustling metropolis, Grand Horizon Hotel offers a luxurious escape with panoramic city views. Its modern architecture blends seamlessly with elegant interiors, featuring marble floors and contemporary art. Guests can indulge in gourmet dining at the rooftop restaurant, relax in the infinity pool, or unwind at the world-class spa. With 24/7 concierge service, business travelers enjoy state-of-the-art meeting rooms, while leisure seekers explore nearby cultural landmarks. The hotel’s commitment to sustainability, including eco-friendly amenities and energy-efficient systems, ensures a guilt-free stay. Whether for work or play, Grand Horizon delivers an unforgettable experience with unmatched sophistication and comfort.',150),(4,'Aurora del sur','El Hotel Aurora del Sur es una joya enclavada en el corazón de la Patagonia argentina, en las afueras de San Martín de los Andes. Rodeado de bosques nativos y a pocos minutos del Lago Lácar, este hotel de montaña ofrece una experiencia inmersiva en la naturaleza, sin sacrificar el confort ni el diseño moderno.  Con una arquitectura que combina madera de lenga, piedra natural y grandes ventanales, el edificio se integra perfectamente con el entorno. Desde cualquier rincón del hotel, es posible contemplar las majestuosas montañas de los Andes australes, mientras se disfruta del aire puro y el silencio profundo que caracteriza a esta región del país. En invierno, el hotel se convierte en una base ideal para quienes buscan practicar esquí o snowboard en el centro de deportes invernales Chapelco, ubicado a solo 20 minutos en auto.',35),(5,'Costa Serena','Ubicado en primera línea de playa sobre las cálidas costas del Mar Caribe, el Hotel Costa Serena es el refugio ideal para quienes buscan una experiencia relajante frente al mar. Situado en la ciudad de Cartagena de Indias, este hotel cinco estrellas combina el encanto colonial de la región con instalaciones modernas, excelente gastronomía y una atención al cliente cuidadosamente personalizada.  La fachada del hotel evoca la arquitectura colonial de los siglos XVII y XVIII, con paredes blancas, balcones de madera tallada y patios interiores llenos de vegetación tropical. En contraste, los espacios interiores sorprenden con un diseño contemporáneo que fusiona mármol, cristales y obras de arte local. Este contraste entre lo clásico y lo moderno da como resultado un ambiente sofisticado pero acogedor.  El Costa Serena cuenta con 120 habitaciones distribuidas en cinco niveles. Cada una tiene vista directa al mar o a los jardines interiores, balcón privado, aire acondicionado, cortinas blackout, TV Smart de 50 pulgadas y baño en suite con ducha tipo lluvia. Las suites superiores incluyen jacuzzi con hidromasaje y mayordomo personalizado.',45),(10,'Diplomático Imperial','l Diplomático Imperial es un refugio de lujo que respira historia y sofisticación. Construido en 1918, este hotel de estilo neoclásico, con sus columnas de mármol y candelabros dorados, fue testigo de reuniones clave durante los años de la posguerra. Se dice que en 1949, en la Suite Libertador, diplomáticos europeos y argentinos negociaron un acuerdo comercial secreto mientras disfrutaban de un tango improvisado en el salón principal, una anécdota que los empleados cuentan con una sonrisa. Sus 230 habitaciones combinan elegancia clásica con comodidades modernas: camas con dosel, escritorios de caoba y vistas panorámicas al Río de la Plata. Los huéspedes pueden deleitarse en el Restaurante Concordia, donde los chefs fusionan sabores argentinos con toques internacionales, o relajarse en el bar clandestino La Cumbre, donde los cócteles llevan nombres de tratados históricos. El salón de baile, con sus frescos restaurados, ha sido escenario de eventos memorables, desde bailes presidenciales hasta bodas de celebridades. Para los amantes de la historia, el hotel ofrece recorridos por su galería de archivos, que exhibe fotografías y objetos, como un menú firmado por un presidente durante una cena de gala en los años 60. Además, su spa ofrece tratamientos como el masaje “Paz Diplomática”, y la piscina en la azotea es perfecta para relajarse tras un día explorando la ciudad. El Diplomático Imperial no solo ofrece un alojamiento de primera, sino también una experiencia inmersiva en la rica historia política y cultural de Argentina, ideal para viajeros que buscan lujo con un toque de intriga.',40),(11,'Reloj de Medianoche','l Reloj de Medianoche es un hotel que combina elegancia contemporánea con un pasado lleno de misterio. Inaugurado en 1925, este edificio art déco fue el lugar donde, según la leyenda urbana, un famoso escritor mexicano escribió una novela de misterio en una sola noche de 1933, inspirado por el sonido del reloj de la recepción que marcaba las horas. Las 180 habitaciones del hotel están decoradas con motivos geométricos y tonos vibrantes, ofreciendo camas king-size, baños de mármol y vistas a la vibrante Ciudad de México. El restaurante La Pluma sirve platillos mexicanos modernos, como tacos de langosta y mole artesanal, mientras que el bar El Insomnio ofrece cócteles inspirados en novelas negras. El hotel organiza noches de “lectura misteriosa”, donde actores recrean escenas de crímenes ficticios en los pasillos, una experiencia que encanta a los huéspedes. Su spa, con tratamientos como el “Descanso del Escritor”, promete relajar hasta al viajero más inquieto. La suite principal, conocida como La Habitación del Reloj, está decorada con relojes antiguos y supuestamente es donde el escritor tuvo su noche de inspiración. Los empleados aseguran, con un toque de humor, que a medianoche se escuchan susurros literarios en los pasillos. Con su mezcla de historia, arte y un toque de intriga, El Reloj de Medianoche es perfecto para quienes buscan una experiencia cultural única en el corazón de México.',78),(12,'Hotel La Perla','La Perla es un ícono de elegancia tropical que destila historia y encanto caribeño. Construido en 1930, este edificio de estilo art nouveau fue originalmente un club social para la élite cubana, famoso por ser el escenario de una divertida anécdota en 1955, cuando un famoso cantante de salsa, en plena fiebre de la noche habanera, organizó un concierto improvisado en el patio del hotel que atrajo a cientos de transeúntes, convirtiendo la calle en una pista de baile espontánea. Los empleados aún cuentan, con una risita, que el cantante dejó una guitarra firmada que se exhibe en el vestíbulo. Sus 150 habitaciones combinan el glamour de la época dorada de Cuba con comodidades modernas: muebles de caoba, cortinas de lino, ventiladores de techo y balcones con vistas al Malecón. Los huéspedes pueden disfrutar del Restaurante El Coral, donde se sirven platos cubanos clásicos como ropa vieja y mojitos artesanales, o relajarse en el bar La Concha, decorado con mosaicos que evocan el fondo del mar. El patio central, rodeado de palmeras y fuentes, es ideal para eventos, desde bodas hasta noches de salsa en vivo. Para los curiosos, el hotel ofrece recorridos históricos que narran su pasado como punto de encuentro de artistas y revolucionarios, incluyendo una visita a la Suite Perla, donde se dice que un poeta escribió versos inspirados en el amanecer habanero. La piscina en la azotea, con vistas al océano, y el spa, que ofrece un masaje “Ritmo Caribeño”, completan la experiencia. La Perla organiza talleres de baile para huéspedes, manteniendo viva la energía de aquella noche legendaria de 1955. Con su mezcla de historia, cultura y hospitalidad cubana, el Hotel La Perla es el lugar perfecto para quienes buscan sumergirse en el alma vibrante de La Habana, con un toque de humor y nostalgia que hace que cada estadía sea inolvidable.',43),(13,'Hotel La Estancia del Gaucho','La Estancia del Gaucho es un hotel rural que celebra la cultura gauchesca con un toque de sofisticación. Construido en 1890 como una hacienda ganadera, este edificio de piedra y madera fue el lugar donde, en 1923, un famoso poeta uruguayo organizó un asado legendario para reconciliar a dos caudillos enfrentados, un evento tan exitoso que terminó con ambos cantando coplas al amanecer, según cuentan los lugareños. Las 90 habitaciones del hotel reflejan el espíritu rústico-elegante de la vida en la pampa, con camas de hierro forjado, mantas tejidas a mano y chimeneas de leña. Los huéspedes pueden deleitarse en el Restaurante El Fogón, donde se sirven cortes de carne asados al estilo gaucho, acompañados de vinos tannat uruguayos, o disfrutar de mate en el bar La Pulpería, decorado con herramientas de campo antiguas. La Estancia ofrece actividades como paseos a caballo, clases de danza folclórica y talleres de asado, ideales para familias o viajeros curiosos. Su piscina al aire libre, rodeada de eucaliptos, y su spa, con un masaje “Alma Campera”, son perfectos para desconectar. Los visitantes pueden explorar la sala de memorabilia, que incluye fotos del asado de 1923 y una guitarra supuestamente tocada esa noche. Los empleados, con un guiño, aseguran que el espíritu del poeta aún inspira versos a los huéspedes que se sientan bajo los árboles. La Estancia del Gaucho es el refugio ideal para quienes buscan una experiencia auténtica, con un toque de humor y la calidez de la tradición uruguaya',20),(14,'El Palacio del Sol','En el corazón de Cusco, Perú, El Palacio del Sol es un hotel boutique que rinde homenaje a la herencia incaica con un toque de modernidad. Construido en 1650 sobre las ruinas de un palacio inca, este hotel de paredes de piedra y arcos coloniales fue escenario de un divertido malentendido en 1870, cuando un arqueólogo británico, convencido de haber encontrado una reliquia inca en el sótano, descubrió que era solo una olla olvidada por un cocinero distraído, una historia que aún provoca risas entre el personal. Sus 120 habitaciones combinan la estética andina con lujos contemporáneos: textiles tejidos a mano, suelos de madera pulida y vistas a las montañas cusqueñas. El Restaurante Inti Raymi ofrece platos inspirados en la cocina andina, como quinua con trucha y pisco sours de autor, mientras que el bar La Chakana está decorado con motivos astronómicos incaicos. El patio de piedra, con una fuente que simula un calendario solar, es ideal para eventos culturales o cenas bajo las estrellas. El hotel organiza recorridos por sus cimientos incaicos y talleres de tejido andino, conectando a los huéspedes con la rica historia de Cusco. La piscina climatizada y el spa, con un tratamiento “Fuerza del Sol”, son perfectos para relajarse tras explorar Machu Picchu. La Suite Imperial, con un mural que recrea el Templo del Sol, es la joya del hotel. Los empleados bromean que la olla del arqueólogo aún está en la cocina, “cocinando historias”. El Palacio del Sol ofrece una experiencia única para quienes buscan lujo, cultura y un toque de humor en la antigua capital inca.',56);
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagens`
--

DROP TABLE IF EXISTS `imagens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imagens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(550) NOT NULL,
  `hotel_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_imagens_hotel_id` (`hotel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagens`
--

LOCK TABLES `imagens` WRITE;
/*!40000 ALTER TABLE `imagens` DISABLE KEYS */;
INSERT INTO `imagens` VALUES (6,'/uploads/img/hotels/1753191593_orla-copacabana-hotel.jpg',2),(7,'/uploads/img/hotels/1753191626_ciudadeapaza.webp',3),(9,'/uploads/img/hotels/1753299202_Montañaverde.jpeg',4),(11,'/uploads/img/hotels/1753299346_lagosereno.jpg',5),(12,'/uploads/img/hotels/1753191307_california.jpg',1),(13,'/uploads/img/hotels/1753301369_SolDorado.jpg',6),(14,'/uploads/img/hotels/1753301369_SolDorado.jpg',7),(15,'/uploads/img/hotels/1753301369_SolDorado.jpg',8),(16,'/uploads/img/hotels/1753301369_SolDorado.jpg',9),(17,'/uploads/img/hotels/1753385871_imperial.jpeg',10),(18,'/uploads/img/hotels/1753385981_relojHotel.jpg',11),(19,'/uploads/img/hotels/1753386039_hotel-la-perla.jpg',12),(20,'/uploads/img/hotels/1753386164_guacho.jpg',13),(21,'/uploads/img/hotels/1753386249_palacioSol.webp',14);
/*!40000 ALTER TABLE `imagens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservs`
--

DROP TABLE IF EXISTS `reservs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `date_start` datetime NOT NULL,
  `date_finish` datetime NOT NULL,
  `hotel_rooms` int(11) NOT NULL,
  `total_price` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservs`
--

LOCK TABLES `reservs` WRITE;
/*!40000 ALTER TABLE `reservs` DISABLE KEYS */;
INSERT INTO `reservs` VALUES (1,1,2,'2025-07-22 21:42:19',NULL,'2025-07-10 21:42:19','2025-07-22 21:42:19',6,456),(2,1,2,'2025-07-22 21:42:19',NULL,'2025-07-10 21:42:19','2025-07-22 21:42:19',3,456),(5,1,1,'2025-07-22 21:22:37','2025-07-22 21:22:37','2025-06-30 21:00:00','2025-07-07 21:00:00',0,0),(7,1,1,'2025-07-22 21:26:01','2025-07-22 21:26:01','2025-07-15 21:00:00','2025-07-24 21:00:00',2,2160),(9,1,3,'2025-07-23 00:51:20','2025-07-23 00:51:20','2025-07-22 21:00:00','2025-07-29 21:00:00',3,2520),(10,1,2,'2025-07-23 00:58:05','2025-07-23 00:58:05','2025-07-23 21:00:00','2025-07-28 21:00:00',3,1800),(11,1,1,'2025-07-23 10:45:54','2025-07-23 10:45:54','2025-07-24 00:00:00','2025-07-31 00:00:00',3,2520),(12,1,1,'2025-07-23 12:41:29','2025-07-23 12:41:29','2025-07-23 00:00:00','2025-07-30 00:00:00',15,12600),(13,1,1,'2025-07-23 17:06:37','2025-07-23 17:06:37','2025-09-17 00:00:00','2025-09-18 00:00:00',4,480);
/*!40000 ALTER TABLE `reservs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `password` (`password`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Tomas','Ossana','tomi1','$2a$10$laj.YtCzh38hAewMM4WL5uRkmLxJJaaCzyJdhLdHPgSK0B5ol3Gjy','ossanatomas5@gmail.com','admin'),(2,'Agustina','Fiorano','Agus1','$2a$10$L9xOfNWBviVFdEQIjQgin.lIGNjrQsL9K7VZIoiS4p8ssfCOD5Vwu','agusfiorano@gmail.com','user'),(3,'Manuel','Ossana','manuoss','$2a$10$vW8ArylkqZCO62RQJlLKK.KC9SnSlLrA2Ggmg44PxTymxgzt.00g6','manuel@gmail.com','user'),(4,'Franca','Ossana','fran1','$2a$10$gnGU.gXuDKBaKbf245bWwuBaM4l7wFawCUJSKsJExOn70PIFxcCia','fran@gmail.com','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-25 11:41:15
