/*
  Warnings:

  - Added the required column `id_market` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "id_market" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id_market_fkey" FOREIGN KEY ("id_market") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
