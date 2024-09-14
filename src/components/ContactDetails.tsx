import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ContactDetails() {
  return (
    <>
      <Link
        href={"https://maps.app.goo.gl/1oCVKBYi6inVydiL8"}
        referrerPolicy="no-referrer"
        className="hover:text-primary transition-colors duration-300 flex gap-2 items-start justify-start"
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
        className="hover:text-primary transition-colors duration-300 flex gap-2 items-start justify-start"
      >
        <div className="">
          <Phone />
        </div>
        +91 94319 97397
      </Link>
      <Link
        href={"mailto:careful4u@hotmail.com"}
        referrerPolicy="no-referrer"
        className="hover:text-primary transition-colors duration-300 flex gap-2 items-start justify-start"
      >
        <div className="">
          <Mail />
        </div>
        careful4u@hotmail.com
      </Link>
    </>
  );
}
