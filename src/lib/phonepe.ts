import axios from "axios";

const phonePeApi = axios.create({
  baseURL: process.env.PHONE_PE_URL,
});

function generateMechantTransactionId() {
  return String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(
    /[xy]/g,
    (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;

      return value.toString(16);
    }
  );
}
function generateUserId() {
  return String("xxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(
    /[xy]/g,
    (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;

      return value.toString(16);
    }
  );
}

function encodeToBase64(obj: object) {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
}

async function sha256(obj: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(obj);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export async function createPhonepeOrder(total: number) {
  const transactionId = generateMechantTransactionId();
  const userId = generateUserId();
  const options = {
    merchantId: process.env.PHONE_PE_MERCHANT_ID,
    merchantTransactionId: transactionId,
    merchantUserId: "MUID" + userId,
    amount: total,
    redirectUrl: process.env.PHONE_PE_REDIRECT,
    redirectMode: "REDIRECT",
    callbackUrl: process.env.PHONE_PE_CALLBACK,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const encoded = encodeToBase64(options);
  const xverify =
    (await sha256(encoded + "pg/v1/pay" + process.env.PHONE_PE_SALT_KEY)) +
    "###" +
    process.env.PHONE_PE_SALT_INDEX;

  //   console.log(xverify);
  try {
    const response = await phonePeApi.post(
      "/pay",
      { request: encoded },
      {
        headers: {
          "X-Verify": xverify,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (e) {
    console.log(e.response.data);
  }
}
