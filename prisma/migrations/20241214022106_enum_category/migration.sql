/*
  Warnings:

  - You are about to alter the column `category` on the `news` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `news` MODIFY `category` ENUM('DO_DUNG_CHO_BE', 'SUC_KHOE_CHO_BE', 'THOI_TRANG_CHO_BE', 'DAY_BE_HOC', 'BE_VUI_CHOI', 'GOC_DANH_CHO_ME', 'GOC_DANH_CHO_CHA', 'KIEN_THUC_NUOI_DAY_CON', 'CHUA_PHAN_LOAI') NOT NULL DEFAULT 'CHUA_PHAN_LOAI';
