-- DropIndex
DROP INDEX `Refresh_token_key` ON `refresh`;

-- AlterTable
ALTER TABLE `refresh` MODIFY `token` TEXT NOT NULL;
