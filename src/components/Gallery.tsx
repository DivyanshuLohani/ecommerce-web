"use client";

import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { GridTileImage } from "./Products/tile";
import Image from "next/image";
import Link from "next/link";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export default function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get("image");
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set("image", nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set("image", previousImageIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out flex items-center justify-center";

  // Animation variants for the image transition
  const imageVariants = {
    initial: { opacity: 0, x: 100 }, // Slide in from the right
    animate: { opacity: 1, x: 0 }, // Fade in and slide to position
    exit: { opacity: 0, x: -100 }, // Slide out to the left
  };

  return (
    <div className="w-full">
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {" "}
          {/* AnimatePresence to handle image transitions */}
          {images[imageIndex] && (
            <motion.div
              key={imageIndex} // Ensure a unique key for each image
              className="h-full w-full"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants}
              transition={{ duration: 0.5 }} // Smooth transition between images
            >
              <Image
                className="h-full w-full object-contain"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                alt={images[imageIndex]?.altText as string}
                src={images[imageIndex]?.src as string}
                priority={true}
                draggable={false}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
              <Link
                aria-label="Previous product image"
                href={previousUrl}
                className={buttonClassName}
                scroll={false}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }} // Hover animation for the button
                  transition={{ duration: 0.3 }}
                >
                  <ArrowLeftIcon className="h-5" />
                </motion.div>
              </Link>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <Link
                aria-label="Next product image"
                href={nextUrl}
                className={buttonClassName}
                scroll={false}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }} // Hover animation for the button
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRightIcon className="h-5" />
                </motion.div>
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {images.map((image, index) => {
            const isActive = index === imageIndex;
            const imageSearchParams = new URLSearchParams(
              searchParams.toString()
            );

            imageSearchParams.set("image", index.toString());

            return (
              <li key={image.src} className="h-20 w-20">
                <Link
                  aria-label="Enlarge product image"
                  href={createUrl(pathname, imageSearchParams)}
                  scroll={false}
                  className="h-full w-full"
                  replace={true}
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
