// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Body = { name: string; email: string; message: string };

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();
    const { name, email, message } = body;
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const FROM = process.env.FROM_EMAIL || "no-reply@example.com";
    const TO = process.env.TO_EMAIL || process.env.SMTP_USER || "yourname@example.com";

    const text = `Message from portfolio contact form\n\nName: ${name}\nEmail: ${email}\n\n${message}`;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS }
      });

      await transporter.sendMail({
        from: FROM,
        to: TO,
        subject: `Portfolio contact from ${name}`,
        text,
        replyTo: email
      });

      return NextResponse.json({ ok: true }, { status: 200 });
    } else {
      console.log("Contact form (no SMTP configured) - message:", { name, email, message });
      return NextResponse.json({ ok: true, info: "no-smtp" }, { status: 200 });
    }
  } catch (err) {
    console.error("contact error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}