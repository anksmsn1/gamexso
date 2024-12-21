import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function  POST(req: NextRequest) {
  try {
    const body = await req.json();
   
    const {contactPerson, email, phone,message } = body;

    if (!contactPerson || !email || !phone || !message) {
      return new Response("Missing required fields", { status: 400 });
    }
    const subject="New Contact Us Enquiry";
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // e.g., smtp.gmail.com
      port: 587, // or 465 for secure
      secure: false, // true for 465, false for other ports
      auth: {
        user: "hostludo@gmail.com",
        pass: "aacmmsuxclrhdjok",
      },
    });

    const text=`<p>New Contact Us Enquiry!</p><p>Details are as given below!</p>
    <p><b>Name:</b>${contactPerson}</p>
    <p><b>Email:</b>${email}</p>
    <p><b>Phone Numner:</b>${phone}</p>
    <p><b>Message:</b>${message}</p>`;

    const to="gamexsogames@gmail.com";
    const mailOptions = {
      from: "hostludo@gmail.com",
      to,
      subject,
      html:text,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error:any) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
