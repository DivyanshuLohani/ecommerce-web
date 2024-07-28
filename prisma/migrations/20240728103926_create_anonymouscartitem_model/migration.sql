-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "quantity" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "AnonymousCartItem" (
    "token" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousCartItem_token_productId_key" ON "AnonymousCartItem"("token", "productId");

-- AddForeignKey
ALTER TABLE "AnonymousCartItem" ADD CONSTRAINT "AnonymousCartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
