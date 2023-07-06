/*
  Warnings:

  - You are about to alter the column `studentId` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `studentId` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Account` MODIFY `studentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Session` MODIFY `studentId` INTEGER NOT NULL;
