/*
  Warnings:

  - You are about to drop the column `category_id` on the `news` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `news` DROP FOREIGN KEY `News_category_id_fkey`;

-- AlterTable
ALTER TABLE `news` DROP COLUMN `category_id`;

-- CreateTable
CREATE TABLE `NewsCategory` (
    `news_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`news_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NewsCategory` ADD CONSTRAINT `NewsCategory_news_id_fkey` FOREIGN KEY (`news_id`) REFERENCES `News`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NewsCategory` ADD CONSTRAINT `NewsCategory_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
