/*
  Warnings:

  - You are about to drop the column `id_product` on the `Price` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_id_product_fkey";

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "id_product",
ADD COLUMN     "product_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
