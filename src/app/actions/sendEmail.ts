"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",

      // 🔥 აქ შეცვალე შენი რეალური email-ით (რომლითაც დარეგისტრირდი Resend-ზე)
      to: "phutkarito@gmail.com",

      subject: "ახალი შეკვეთა",
      html: `
        <h2>ახალი შეკვეთა</h2>
        <p><b>სახელი:</b> ${formData.get("name")}</p>
        <p><b>ტელეფონი:</b> ${formData.get("phone")}</p>
        <p><b>პროდუქტი:</b> ${formData.get("product")}</p>
        <p><b>შეტყობინება:</b> ${formData.get("message")}</p>
      `,
    });

    console.log("✅ მეილი გაიგზავნა");
  } catch (error) {
    console.log("❌ შეცდომა:", error);
  }
}