"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import ContactDetails from "./ContactDetails";

export default function Footer() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      className="flex flex-col border-t pt-10 pb-5 w-full bg-background text-foreground"
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.6 }}
    >
      <div className="px-5 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-10 pb-5">
        <motion.div className="about">
          <h4 className="text-lg font-semibold mb-5 uppercase">About Us</h4>
          <p>
            Maa Kali Griha Udyog stands as a symbol of quality and tradition in
            the Agarbatti and Dhoop Industry. Our store offers a wide selection
            of handpicked products and accessories designed to meet your prayer,
            personal care, air care, and lifestyle needs.
          </p>
        </motion.div>

        <motion.div className="policies">
          <h4 className="text-lg font-semibold mb-5 uppercase">Our Policies</h4>
          <ul>
            <Link
              href={"/privacy-policy"}
              className="hover:text-primary transition-colors duration-300"
            >
              <li>Privacy Policy</li>
            </Link>
            <Link
              href={"/terms-conditions"}
              className="hover:text-primary transition-colors duration-300"
            >
              <li>Terms & Conditions</li>
            </Link>
            <Link
              href={"/returns-refunds"}
              className="hover:text-primary transition-colors duration-300"
            >
              <li>Returns & Refund</li>
            </Link>
          </ul>
        </motion.div>

        <motion.div className="quick">
          <h4 className="text-lg font-semibold mb-5 uppercase">Quick Links</h4>
          <ul>
            <Link
              href={"/faq"}
              className="hover:text-primary transition-colors duration-300"
            >
              <li>FAQ</li>
            </Link>
            <Link
              href={"/about"}
              className="hover:text-primary transition-colors duration-300"
            >
              <li>About Us</li>
            </Link>
            <Link
              href={"/contact"}
              className="hover:text-primary transition-colors duration-300"
            >
              <li>Contact Us</li>
            </Link>
            <Link
              href={"/sitemap"}
              className="hover:text-primary transition-colors duration-300"
            >
              <li>Sitemap</li>
            </Link>
          </ul>
        </motion.div>

        <motion.div className="business">
          <h4 className="text-lg font-semibold mb-5 uppercase">
            Business Information
          </h4>
          <ul className="flex flex-col gap-4">
            <ContactDetails />
          </ul>
        </motion.div>
      </div>

      <motion.div className="flex justify-end items-center pt-3 px-5 md:px-10">
        <span className="text-sm">
          <Link
            href={"https://divyanshulohani.xyz/"}
            referrerPolicy="no-referrer"
            className="hover:text-primary transition-colors duration-300"
          >
            Designed and Developed by Divyanshu Lohani
          </Link>
        </span>
      </motion.div>
    </motion.footer>
  );
}
