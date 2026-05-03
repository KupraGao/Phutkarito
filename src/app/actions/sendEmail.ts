"use server";

// ❌ დროებით ვთიშავთ Resend-ს, რადგან Vercel-ზე API key არ გვაქვს
// import { Resend } from "resend";

// ❌ ეს ხაზიც გამორთულია, რადგან აქედან მოდიოდა build error
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  try {
    // 🟡 დროებითი ლოგიკა — უბრალოდ ვამოწმებთ რომ ფორმა მუშაობს
    console.log("📩 ფორმა მიღებულია (დროებითი რეჟიმი)");

    console.log({
      name: formData.get("name"),        // მომხმარებლის სახელი
      phone: formData.get("phone"),      // ტელეფონი
      product: formData.get("product"),  // არჩეული პროდუქტი
      message: formData.get("message"),  // შეტყობინება
    });

    // ❌ Resend გაგზავნა დროებით გამორთულია
    /*
    await resend.emails.send({
      from: "onboarding@resend.dev",
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
    */

    console.log("✅ ფორმა დამუშავდა (მეილი დროებით გათიშულია)");
  } catch (error) {
    console.log("❌ შეცდომა:", error);
  }
}