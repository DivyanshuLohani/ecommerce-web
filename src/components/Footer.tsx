import Link from "next/link";
import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-col border-t  pt-10 pb-5 w-full">
      <div className="px-5 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-10 pb-5">
        <div className="about">
          <h4 className="text-lg font-semibold mb-5 uppercase">About Us</h4>
          <p>
            Maa Kali Griha Udyog stands as a symbol of quality and tradition in
            the fragrance industry. Our store offers a wide selection of
            handpicked products and accessories designed to meet your prayer,
            personal care, air care, and lifestyle needs.
          </p>
        </div>
        <div className="policies">
          <h4 className="text-lg font-semibold mb-5 uppercase">Our Policies</h4>
          <ul>
            <Link
              href={"/privacy-policy"}
              className="hover:text-[#4050f8] transition-colors duration-300"
            >
              <li>Privacy Policy</li>
            </Link>
            <Link
              href={"/terms-conditions"}
              className="hover:text-[#4050f8] transition-colors duration-300"
            >
              <li>Terms & Condition</li>
            </Link>
            <Link
              href={"/returns-refunds"}
              className="hover:text-[#4050f8] transition-colors duration-300"
            >
              <li>Returns & Refund</li>
            </Link>
          </ul>
        </div>
        <div className="quick">
          <h4 className="text-lg font-semibold mb-5 uppercase">Quick Links</h4>
          <ul>
            <Link
              href={"/accounts/orders/"}
              className="hover:text-[#4050f8] transition-colors duration-300"
            >
              <li>Track Order</li>
            </Link>
            <Link
              href={"/about"}
              className="hover:text-[#4050f8] transition-colors duration-300"
            >
              <li>About Us</li>
            </Link>
            <Link
              href={"/contact"}
              className="hover:text-[#4050f8] transition-colors duration-300"
            >
              <li>Contact Us</li>
            </Link>
            <Link
              href={"/sitemap"}
              className="hover:text-[#4050f8] transition-colors duration-300"
            >
              <li>Sitemap</li>
            </Link>
          </ul>
        </div>
        <div className="business">
          <h4 className="text-lg font-semibold mb-5 uppercase">
            Business Information
          </h4>
          <ul className="flex flex-col gap-4">
            <Link
              href={"https://maps.app.goo.gl/1oCVKBYi6inVydiL8"}
              referrerPolicy="no-referrer"
              className="hover:text-[#4050f8] transition-colors duration-300 flex gap-2 items-start justify-start"
            >
              <div className="mt-2">
                <MapPin />
              </div>
              Maa Kali Griha Udyog, PT Road, near Kedia Dharamshala, Koritola,
              Pachamba, Giridih, Jharkhand 815316
            </Link>
            <Link
              href={"tel:+919431997397"}
              referrerPolicy="no-referrer"
              className="hover:text-[#4050f8] transition-colors duration-300 flex gap-2 items-start justify-start"
            >
              <div className="">
                <Phone />
              </div>
              +91 94319 97397
            </Link>
            <Link
              href={"mailto:careful4u@hotmail.com"}
              referrerPolicy="no-referrer"
              className="hover:text-[#4050f8] transition-colors duration-300 flex gap-2 items-start justify-start"
            >
              <div className="">
                <Mail />
              </div>
              careful4u@hotmail.com
            </Link>
          </ul>
        </div>
      </div>
      <div className="flex justify-end border-t items-center py-3 px-5 md:px-10 bg-blue-50">
        {/* <span>Copyright&copy;{new Date().getFullYear()}</span> */}
        <span className="text-sm">
          <Link
            href={"https://divyanshulohani.github.io/"}
            referrerPolicy="no-referrer"
            className="hover:text-[#4050f8] transition-colors duration-300"
          >
            Designed and Developed by Divyanshu Lohani
          </Link>
        </span>
      </div>
    </footer>
  );
}
