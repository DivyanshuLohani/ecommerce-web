"use server";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

async function generateSha256Hash(fullURL: string) {
  const encoder = new TextEncoder(); // Encodes the string to a Uint8Array
  const data = encoder.encode(fullURL); // Convert the URL to bytes
  const hashBuffer = await crypto.subtle.digest("SHA-256", data); // Hash the data
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join(""); // Convert bytes to hex string
  return hashHex;
}

function generatePayload(total: number) {
  const transactionid = uuidv4();
  return {
    merchantId: process.env.PHONE_PE_MERCHANT_ID,
    merchantTransactionId: transactionid,
    merchantUserId: uuidv4(),
    amount: total,
    redirectUrl: `${process.env.REDIRECT_URL}/${transactionid}`,
    redirectMode: "POST",
    callbackUrl: `${process.env.CALLBACK_URL}/${transactionid}`,
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };
}

async function generateChecksum(payload: any) {
  const dataPayload = JSON.stringify(payload);
  const dataBase64 = Buffer.from(dataPayload).toString("base64");
  const fullURL = dataBase64 + "/pg/v1/pay" + process.env.PHONE_PE_SALT_KEY;
  const dataSha256 = await generateSha256Hash(fullURL);
  return dataSha256 + "###" + process.env.PHONE_PE_SALT_INDEX;
}

export async function createTransaction(
  total: number
): Promise<{ redirectUrl: string; transactionid: string } | null> {
  const payload = generatePayload(total);
  const dataPayload = JSON.stringify(payload);
  const dataBase64 = Buffer.from(dataPayload).toString("base64");

  const checksum = await generateChecksum(payload);
  // const PAY_API_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
  const PAY_API_URL = process.env.PHONE_PE_URL as string;

  try {
    const response = await axios.post(
      PAY_API_URL,
      {
        request: dataBase64,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
      }
    );
    if (!response.data.success) return null;
    const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
    return {
      redirectUrl,
      transactionid: payload.merchantTransactionId,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}
