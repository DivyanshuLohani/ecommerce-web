"use client";
import React, { useState } from "react";
import AddressForm from "../Accounts/AddressForm";

const CheckoutForm = () => {
  //   const handlePayment = async () => {
  //     const response = await fetch("/api/create-order", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ amount: 500 }), // Replace with actual amount
  //     });
  //     const order = await response.json();

  //     const options = {
  //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  //       amount: order.amount,
  //       currency: order.currency,
  //       name: "Maa Kali Griha Udyog",
  //       description: "Test Transaction",
  //       image: "/your_logo.png",
  //       order_id: order.id,
  //       handler: function (response) {
  //         alert(response.razorpay_payment_id);
  //         alert(response.razorpay_order_id);
  //         alert(response.razorpay_signature);
  //       },
  //       prefill: {
  //         name: formData.name,
  //         email: formData.email,
  //         contact: "9999999999",
  //       },
  //       theme: {
  //         color: "#F37254",
  //       },
  //     };

  //     const razorpay = new window.Razorpay(options);
  //     razorpay.open();
  //   };

  return (
    <div className="md:w-1/2">
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      <AddressForm />
    </div>
  );
};

export default CheckoutForm;
