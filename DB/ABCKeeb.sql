SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema ABCKeeb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ABCKeeb` DEFAULT CHARACTER SET utf8 ;
USE `ABCKeeb` ;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Keyboards'),(2,'Keycaps'),(3,'Switches'),(4,'Accessories');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int NOT NULL,
  `picture` varchar(200) NOT NULL,
  `variant` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `product_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'KARA','Eyes blue like the atlantic and Im goin down',239.99,1,'../resources/Keyboards/KARA/AZUR.png','AZUR'),(2,'KARA','Purple colored injection molded beauty',239.99,1,'../resources/Keyboards/KARA/HAZE.png','HAZE'),(3,'KARA','Cold cold heart~ heart done by you',239.99,1,'../resources/Keyboards/KARA/ICED.png','ICED'),(4,'KARA','Dark side of the moon',259.99,1,'../resources/Keyboards/KARA/MOON.png','MOON'),(5,'KARA','Embrace the emo',239.99,1,'../resources/Keyboards/KARA/NOCT.png','NOCT'),(6,'KARA','Looks like soy milk',259.99,1,'../resources/Keyboards/KARA/SOYA.png','SOYA'),(7,'M6-C','Pastel pink and cats, whats not to love?',69.98,1,'../resources/Keyboards/M6-C/NEKO.png','NEKO'),(8,'M6-C','Oooh, dandelions, must be the last one of the season',69.42,1,'../resources/Keyboards/M6-C/DANDY.png','DANDY'),(9,'M6-C','Colors inspired by retro gaming consoles',89.32,1,'../resources/Keyboards/M6-C/DUALSHOT.png','DUALSHOT'),(10,'M6-C','Inspired by night traffic lights, yes. Traffic lights',99.32,1,'../resources/Keyboards/M6-C/METROPOLIS.png','METROPOLIS'),(11,'THERMAL','Switch off the lights, and its gone!',389.98,1,'../resources/Keyboards/THERMAL/KURO.png','KURO'),(12,'THERMAL','No wonder daddy didnt come back after getting this',389.98,1,'../resources/Keyboards/THERMAL/MILK.png','MILK'),(13,'THERMAL','Landing might be fake, this one is real. Guaranteed.',389.98,1,'../resources/Keyboards/THERMAL/MOON.png','MOON'),(14,'THERMAL','Who says boys dont get roses?',389.98,1,'../resources/Keyboards/THERMAL/ROSE.png','ROSE'),(15,'THERMAL','Who you callin soy boy? *Points gun at camera*',389.98,1,'../resources/Keyboards/THERMAL/SOYA.png','SOYA'),(16,'THERMAL PLUS','Slightly easier to locate in the dark compared to THERMAL due to its size',489.99,1,'../resources/Keyboards/THERMAL PLUS/KURO.png','KURO'),(17,'THERMAL PLUS','Best enjoyed with fruit loops',489.99,1,'../resources/Keyboards/THERMAL PLUS/MILK.png','MILK'),(18,'THERMAL PLUS','Designed by carefully color dropping pictures of the moon(from google)',489.99,1,'../resources/Keyboards/THERMAL PLUS/MOON.png','MOON'),(19,'THERMAL PLUS','No valentine? No problem!',489.99,1,'../resources/Keyboards/THERMAL PLUS/ROSE.png','ROSE'),(20,'THERMAL PLUS','Soy boy PRO MAX PLUS ULTRA',489.99,1,'../resources/Keyboards/THERMAL PLUS/SOYA.png','SOYA'),(21,'Heavy Industry','Industry Stylez',69.00,2,'../resources/Keycaps/Heavy Industry/DARK.png','DARK'),(22,'Heavy Industry','Industry Stylez. For the less emo people',69.00,2,'../resources/Keycaps/Heavy Industry/LIGHT.png','LIGHT'),(23,'SEQ 1','Classic BlacknWhite. Can pair with any keyboard',78.98,2,'../resources/Keycaps/SEQ 1/KURO.png','KURO'),(24,'SEQ 1','Like KURO, but inverted, and slightly off-white',64.98,2,'../resources/Keycaps/SEQ 1/MILK.png','MILK'),(25,'SEQ 1','Im sorry its my favourite color',64.98,2,'../resources/Keycaps/SEQ 1/SOYA.png','SOYA'),(26,'SEQ 2','Purple oooOoOOOOoooOooh',78.98,2,'../resources/Keycaps/SEQ 2/HAZE.png','HAZE'),(27,'SEQ 2','Designer told me color represents water. Im not buying it',58.98,2,'../resources/Keycaps/SEQ 2/LAKE.png','LAKE'),(28,'SEQ 2','Smack before consumption',67.51,2,'../resources/Keycaps/SEQ 2/MINT.png','MINT'),(29,'SEQ 2','Dont look at me, I dont know why its called MUSK either',78.64,2,'../resources/Keycaps/SEQ 2/MUSK.png','MUSK'),(30,'SEQ 2','Tangerines are like oranges, on the roids',43.75,2,'../resources/Keycaps/SEQ 2/TANG.png','TANG'),(31,'SEQ 2','Designer says its inspired by normal eggs. I say century eggs.',74.32,2,'../resources/Keycaps/SEQ 2/YOLK.png','YOLK'),(32,'FARMLAND','Bouncy typing feel, like a frog',0.23,3,'../resources/Switches/FARMLAND/FROG.png','FROG'),(33,'FARMLAND','Very qlacky switch',0.34,3,'../resources/Switches/FARMLAND/DUCK.png','DUCK'),(34,'PAINT','Creamy~',0.18,3,'../resources/Switches/PAINT/CREAM.png','CREAM'),(35,'PAINT','Full POM housing for that DEEP THOCK',0.48,3,'../resources/Switches/PAINT/INK.png','INK'),(36,'ARTISAN','Kinda reminds me of interstellar',78.96,4,'../resources/Accessories/ARTISAN/ECLIPSE.png','ECLIPSE'),(37,'ARTISAN','Inspired by Mount Fuji',79.78,4,'../resources/Accessories/ARTISAN/FUJI.png','FUJI'),(38,'ARTISAN','Totally legal to purchase',99.98,4,'../resources/Accessories/ARTISAN/IVORY.png','IVORY'),(39,'ARTISAN','Best served with the NEKO M6-C',77.00,4,'../resources/Accessories/ARTISAN/NEKO.png','NEKO'),(40,'ARTISAN','A pagoda is an Asiant tiered tower. This ones from Japan. Obviously',76.92,4,'../resources/Accessories/ARTISAN/PAGODA.png','PAGODA'),(41,'ARTISAN','Bubble tea served with rocks',83.23,4,'../resources/Accessories/ARTISAN/ROCKS.png','ROCKS'),(42,'Carrying Case','Carrying Case for your M6-C. Military Grade (source: Trust Me Bro)',30.29,4,'../resources/Accessories/Carrying Case/BLACK.png','BLACK');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-18 16:19:15
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'john4int';
