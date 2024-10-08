-- CreateTable
CREATE TABLE "ProductImages" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
