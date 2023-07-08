/*
  Warnings:

  - Made the column `name` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Student` MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `email` VARCHAR(100) NOT NULL;
