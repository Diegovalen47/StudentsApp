-- CreateTable
CREATE TABLE `Course` (
    `courseId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `credits` INTEGER NOT NULL,
    `typologyId` INTEGER NOT NULL,

    INDEX `typologyId`(`typologyId`),
    PRIMARY KEY (`courseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inscription` (
    `inscriptionId` INTEGER NOT NULL AUTO_INCREMENT,
    `targetScore` DECIMAL(2, 1) NULL,
    `courseId` INTEGER NOT NULL,
    `semesterId` INTEGER NOT NULL,

    INDEX `courseId`(`courseId`),
    INDEX `semesterId`(`semesterId`),
    PRIMARY KEY (`inscriptionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partial` (
    `partialId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `weight` DECIMAL(4, 3) NOT NULL,
    `score` DECIMAL(2, 1) NULL,
    `inscriptionId` INTEGER NOT NULL,

    INDEX `inscriptionId`(`inscriptionId`),
    PRIMARY KEY (`partialId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Semester` (
    `semesterId` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `period` INTEGER NOT NULL,
    `targetScore` DECIMAL(2, 1) NULL,
    `planId` INTEGER NOT NULL,

    INDEX `planId`(`planId`),
    PRIMARY KEY (`semesterId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `studentId` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `password` VARCHAR(300) NOT NULL,
    `email` VARCHAR(100) NULL,

    UNIQUE INDEX `userName`(`userName`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`studentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudyPlan` (
    `planId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `approvalScore` DECIMAL(2, 1) NOT NULL,
    `minimunScore` DECIMAL(2, 1) NOT NULL,
    `maximumScore` DECIMAL(2, 1) NOT NULL,
    `studentId` INTEGER NOT NULL,

    INDEX `studentId`(`studentId`),
    PRIMARY KEY (`planId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Typology` (
    `typologyId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `requiredCredits` INTEGER NOT NULL,
    `planId` INTEGER NOT NULL,

    INDEX `planId`(`planId`),
    PRIMARY KEY (`typologyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
