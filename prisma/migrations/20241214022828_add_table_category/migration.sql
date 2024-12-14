/*
  Warnings:

  - You are about to drop the column `category` on the `news` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `news` DROP COLUMN `category`,
    ADD COLUMN `category_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('DO_DUNG_CHO_BE', 'SUC_KHOE_CHO_BE', 'THOI_TRANG_CHO_BE', 'DAY_BE_HOC', 'BE_VUI_CHOI', 'GOC_DANH_CHO_ME', 'GOC_DANH_CHO_CHA', 'KIEN_THUC_NUOI_DAY_CON', 'CHUA_PHAN_LOAI') NOT NULL DEFAULT 'CHUA_PHAN_LOAI',

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
