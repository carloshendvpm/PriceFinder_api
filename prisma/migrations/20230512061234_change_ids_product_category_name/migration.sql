/*
  Warnings:

  - You are about to drop the column `categoryId` on the `products_categories` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `products_categories` table. All the data in the column will be lost.
  - Added the required column `id_category` to the `products_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_product` to the `products_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products_categories" DROP CONSTRAINT "products_categories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "products_categories" DROP CONSTRAINT "products_categories_productId_fkey";

-- AlterTable
ALTER TABLE "products_categories" DROP COLUMN "categoryId",
DROP COLUMN "productId",
ADD COLUMN     "id_category" INTEGER NOT NULL,
ADD COLUMN     "id_product" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
