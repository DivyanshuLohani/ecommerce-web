import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { fetchBanners } from "@/lib/data";

export default async function BannerSection() {
  const banners = await fetchBanners();
  return (
    <Carousel>
      <CarouselContent>
        {banners.map((b) => (
          <CarouselItem key={b.id}>
            <Link href={b.url}>
              <div className="p-1 w-screen">
                <Image
                  height={300}
                  width={1024}
                  src={b.imageUrl}
                  alt=""
                  className="h-full w-full"
                />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
