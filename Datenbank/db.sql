-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema rootcook
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `rootcook` ;

-- -----------------------------------------------------
-- Schema rootcook
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `rootcook` DEFAULT CHARACTER SET utf8 ;
USE `rootcook` ;

-- -----------------------------------------------------
-- Table `rootcook`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rootcook`.`User` ;

CREATE TABLE IF NOT EXISTS `rootcook`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` LONGTEXT NOT NULL,
  `ACCESS_TOKEN` LONGTEXT NULL,
  `REFRESH_TOKEN` LONGTEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `ACEES_TOKEN_UNIQUE` ON `rootcook`.`User` (`ACCESS_TOKEN`(255) ASC);


CREATE UNIQUE INDEX `REFRESH_TOKEN_UNIQUE` ON `rootcook`.`User` (`REFRESH_TOKEN`(255)  ASC);


-- -----------------------------------------------------
-- Table `rootcook`.`Categorie`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rootcook`.`Categorie` ;

CREATE TABLE IF NOT EXISTS `rootcook`.`Categorie` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categorie` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `categorie_UNIQUE` ON `rootcook`.`Categorie` (`categorie` ASC);


-- -----------------------------------------------------
-- Table `rootcook`.`meal_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rootcook`.`meal_type` ;

CREATE TABLE IF NOT EXISTS `rootcook`.`meal_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `type_UNIQUE` ON `rootcook`.`meal_type` (`type` ASC);


-- -----------------------------------------------------
-- Table `rootcook`.`Recipe`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rootcook`.`Recipe` ;

CREATE TABLE IF NOT EXISTS `rootcook`.`Recipe` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `image` LONGTEXT NOT NULL,
  `instructions` LONGTEXT NOT NULL,
  `calories` INT NOT NULL,
  `protein` INT NOT NULL,
  `fat` INT NOT NULL,
  `fibres` INT NOT NULL,
  `sugar` INT NOT NULL,
  `published` TINYINT NOT NULL,
  `User_id` INT NOT NULL,
  `Categorie_id` INT NOT NULL,
  `meal_type_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Recipe_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `rootcook`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Recipe_Categorie1`
    FOREIGN KEY (`Categorie_id`)
    REFERENCES `rootcook`.`Categorie` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Recipe_meal_type1`
    FOREIGN KEY (`meal_type_id`)
    REFERENCES `rootcook`.`meal_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Recipe_User1_idx` ON `rootcook`.`Recipe` (`User_id` ASC);

CREATE INDEX `fk_Recipe_Categorie1_idx` ON `rootcook`.`Recipe` (`Categorie_id` ASC);

CREATE INDEX `fk_Recipe_meal_type1_idx` ON `rootcook`.`Recipe` (`meal_type_id` ASC);


-- -----------------------------------------------------
-- Table `rootcook`.`Ingredient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rootcook`.`Ingredient` ;

CREATE TABLE IF NOT EXISTS `rootcook`.`Ingredient` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `name_UNIQUE` ON `rootcook`.`Ingredient` (`name` ASC);


-- -----------------------------------------------------
-- Table `rootcook`.`Recipe_has_Ingredient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rootcook`.`Recipe_has_Ingredient` ;

CREATE TABLE IF NOT EXISTS `rootcook`.`Recipe_has_Ingredient` (
  `Recipe_id` INT NOT NULL AUTO_INCREMENT,
  `Ingredient_id` INT NOT NULL,
  `amount` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Recipe_id`, `Ingredient_id`),
  CONSTRAINT `fk_Recipe_has_Ingredient_Recipe`
    FOREIGN KEY (`Recipe_id`)
    REFERENCES `rootcook`.`Recipe` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Recipe_has_Ingredient_Ingredient1`
    FOREIGN KEY (`Ingredient_id`)
    REFERENCES `rootcook`.`Ingredient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Recipe_has_Ingredient_Ingredient1_idx` ON `rootcook`.`Recipe_has_Ingredient` (`Ingredient_id` ASC);

CREATE INDEX `fk_Recipe_has_Ingredient_Recipe_idx` ON `rootcook`.`Recipe_has_Ingredient` (`Recipe_id` ASC);


-- -----------------------------------------------------
-- Table `rootcook`.`Bookmarks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rootcook`.`Bookmarks` ;

CREATE TABLE IF NOT EXISTS `rootcook`.`Bookmarks` (
  `Recipe_id` INT NOT NULL,
  `User_id` INT NOT NULL,
  PRIMARY KEY (`Recipe_id`, `User_id`),
  CONSTRAINT `fk_Recipe_has_User_Recipe1`
    FOREIGN KEY (`Recipe_id`)
    REFERENCES `rootcook`.`Recipe` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Recipe_has_User_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `rootcook`.`User` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_Recipe_has_User_User1_idx` ON `rootcook`.`Bookmarks` (`User_id` ASC);

CREATE INDEX `fk_Recipe_has_User_Recipe1_idx` ON `rootcook`.`Bookmarks` (`Recipe_id` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
