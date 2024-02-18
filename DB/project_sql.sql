-- MySQL Script generated by MySQL Workbench
-- Mon Jan 15 21:21:12 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ABCKeeb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ABCKeeb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ABCKeeb` DEFAULT CHARACTER SET utf8 ;
USE `ABCKeeb` ;

-- -----------------------------------------------------
-- Table `ABCKeeb`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABCKeeb`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABCKeeb`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABCKeeb`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `category_id` INT NOT NULL,
  `picture` VARCHAR(200) NOT NULL,
  `variant` VARCHAR(20) NOT NULL ,
  PRIMARY KEY (`id`),
  INDEX `category_id_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `product_category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `ABCKeeb`.`category` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'john4int';

