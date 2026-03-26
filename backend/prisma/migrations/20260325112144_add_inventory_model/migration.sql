/*
  Warnings:

  - Added the required column `modelId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inventory` ADD COLUMN `modelId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `InventoryModel` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `InventoryModel_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `InventoryModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
