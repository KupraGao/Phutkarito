"use server";

import { Resend } from "resend";

// 🔑 ვიღებთ API key-ს environment variable-იდან
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  try {
    // 🟡 მონაცემების ამოღება ფორმიდან
    const name = formData.get("name");
    const phone = formData.get("phone");
    const product = formData.get("product");
    const message = formData.get("message");

    // 🧪 ლოგი (debug-ისთვის)
    console.log("📩 ფორმა მიღებულია:", { name, phone, product, message });

    // 📧 Resend email გაგზავნა
    await resend.emails.send({
      from: "onboarding@resend.dev", // 🔥 შემდეგში შევცვლით custom domain-ით
      to: "phutkarito@gmail.com",
      subject: "ახალი შეკვეთა",
      html: `
        <h2>ახალი შეკვეთა</h2>
        <p><b>სახელი:</b> ${name}</p>
        <p><b>ტელეფონი:</b> ${phone}</p>
        <p><b>პროდუქტი:</b> ${product}</p>
        <p><b>შეტყობინება:</b> ${message}</p>
      `,
    });

    console.log("✅ მეილი გაიგზავნა წარმატებით");
  } catch (error) {
    console.log("❌ შეცდომა:", error);
  }
}