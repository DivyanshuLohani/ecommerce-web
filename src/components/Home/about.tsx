import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <section className="flex flex-col gap-10 md:gap-0 md:flex-row px-5 md:px-10 bg-slate-300 py-10">
      <div className="flex flex-col gap-5 w-full  md:w-4/5">
        <h4 className="text-xl font-semibold">WHO WE ARE?</h4>
        <p>
          Welcome to Maa Kali Griha Udyog, a company dedicated to enriching your
          spiritual journey with our unmatched expertise in crafting exquisite
          fragrance products. Since 1988, we have been committed to providing
          pure, divine experiences through our range of Agarbatti, Dhoop, and
          other prayer essentials.
        </p>
        <p>
          Maa Kali Griha Udyog stands as a symbol of quality and tradition in
          the fragrance industry. Our store offers a wide selection of
          handpicked products and accessories designed to meet your prayer,
          personal care, air care, and lifestyle needs.
        </p>
        <p>
          Celebrate over three decades of excellence with Maa Kali Griha Udyog,
          where we blend traditional craftsmanship with modern sensibilities to
          enhance every moment of your spiritual journey. Experience the divine
          essence of our products, crafted with love and dedication.
        </p>
      </div>
      <div className="flex w-full md:w-1/5 items-center justify-center">
        <Image
          width={200}
          height={200}
          alt="Maa Kali Logo"
          src={"/logo.jpg"}
          className="w-full"
        />
      </div>
    </section>
  );
}
