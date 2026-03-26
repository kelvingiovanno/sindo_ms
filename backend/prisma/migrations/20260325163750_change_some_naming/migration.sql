/*
  Warnings:

  - You are about to drop the column `stockStatus` on the `inventory` table. All the data in the column will be lost.
  - Added the required column `status` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inventory` DROP COLUMN `stockStatus`,
    ADD COLUMN `status` ENUM('IN_STOCK', 'OUT_OF_STOCK', 'LOW_STOCK', 'DISCONTINUED') NOT NULL;
