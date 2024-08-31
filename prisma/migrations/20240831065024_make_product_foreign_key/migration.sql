-- AddForeignKey
ALTER TABLE "WholesaleInquiry" ADD CONSTRAINT "WholesaleInquiry_productInterest_fkey" FOREIGN KEY ("productInterest") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
