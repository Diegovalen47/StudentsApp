CREATE TABLE `Student`(
  `studentId` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `userName` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `password` VARCHAR(300) NOT NULL,
  `email` VARCHAR(100) UNIQUE
);

CREATE TABLE `StudyPlan`(
  `planId` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `approvalScore` DECIMAL(2,1) NOT NULL,
  `minimunScore` DECIMAL(2,1) NOT NULL,
  `maximumScore` DECIMAL(2,1) NOT NULL,

  `studentId` INTEGER NOT NULL,
  KEY (`studentId`)
);

CREATE TABLE `Typology`(

  `typologyId` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `requiredCredits` INTEGER NOT NULL,

  `planId` INTEGER NOT NULL,
  KEY (`planId`)
);

CREATE TABLE `Course`(
  `courseId` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `credits` INTEGER NOT NULL,

  `typologyId` INTEGER NOT NULL,
  KEY (`typologyId`)
);

CREATE TABLE `Semester`(
  `semesterId` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `number` INTEGER NOT NULL,
  `year` INTEGER NOT NULL,
  `period` INTEGER NOT NULL,
  `targetScore` DECIMAL(2,1),

  `planId` INTEGER NOT NULL,
  KEY (`planId`)
);

CREATE TABLE `Inscription`(
  `inscriptionId` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `targetScore` DECIMAL(2,1),

  `courseId` INTEGER NOT NULL,
  `semesterId` INTEGER NOT NULL,
  KEY (`courseId`),
  KEY (`semesterId`)
);

CREATE TABLE `Partial`(

  `partialId` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `weight` DECIMAL(4, 3) NOT NULL,
  `score` DECIMAL(2, 1),

  `inscriptionId` INTEGER NOT NULL,
  KEY (`inscriptionId`)
);