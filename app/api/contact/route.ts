import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "@/lib/supabase";

// Rate limiting
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count++;
  return true;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  pool: true,
  maxConnections: 3,
});

function clientEmailHtml(firstName: string, message: string) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0f1419;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1419;padding:40px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#151a21;">
<tr><td style="background:#E5E4E2;padding:28px 40px;">
  <p style="margin:0;color:#0f1419;font-size:20px;font-weight:900;letter-spacing:-0.5px;">SOCIORYX</p>
</td></tr>
<tr><td style="padding:40px;">
  <h1 style="margin:0 0 16px;color:#F8F8FF;font-size:22px;font-weight:800;">Hey ${firstName}, we got it. 👋</h1>
  <p style="margin:0 0 24px;color:#B8C5D6;font-size:15px;line-height:1.7;">
    Thanks for reaching out to <strong style="color:#F8F8FF;">Socioryx</strong>.
    We'll get back to you within <strong style="color:#E5E4E2;">24 hours</strong>.
  </p>
  <div style="background:#0f1419;border-left:3px solid #E5E4E2;padding:16px 20px;margin-bottom:28px;">
    <p style="margin:0 0 6px;color:#B8C5D6;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Your message</p>
    <p style="margin:0;color:#B8C5D6;font-size:14px;line-height:1.6;">${message}</p>
  </div>
  <p style="margin:0;color:#B8C5D6;font-size:13px;">
    Check out our work at <a href="https://kreatista.in/" style="color:#E5E4E2;text-decoration:none;">kreatista.in</a>
  </p>
</td></tr>
<tr><td style="padding:20px 40px;border-top:1px solid #1a1f26;">
  <p style="margin:0;color:#B8C5D6;font-size:11px;opacity:0.4;">© 2025 Socioryx. All rights reserved.</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function internalEmailHtml(firstName: string, lastName: string, email: string, subject: string, message: string) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0f1419;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1419;padding:40px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#151a21;">
<tr><td style="background:#E5E4E2;padding:20px 40px;">
  <p style="margin:0;color:#0f1419;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">New Lead — Socioryx</p>
</td></tr>
<tr><td style="padding:32px 40px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #1a1f26;color:#B8C5D6;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;width:90px;">Name</td>
      <td style="padding:10px 0;border-bottom:1px solid #1a1f26;color:#F8F8FF;font-size:14px;">${firstName} ${lastName}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #1a1f26;color:#B8C5D6;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Email</td>
      <td style="padding:10px 0;border-bottom:1px solid #1a1f26;color:#F8F8FF;font-size:14px;">${email}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #1a1f26;color:#B8C5D6;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Service</td>
      <td style="padding:10px 0;border-bottom:1px solid #1a1f26;color:#F8F8FF;font-size:14px;">${subject}</td>
    </tr>
  </table>
  <div style="background:#0f1419;border-left:3px solid #E5E4E2;padding:16px 20px;margin-top:24px;">
    <p style="margin:0 0 6px;color:#B8C5D6;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Message</p>
    <p style="margin:0;color:#B8C5D6;font-size:14px;line-height:1.6;">${message}</p>
  </div>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (message.length > 2000 || firstName.length > 100 || lastName.length > 100) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    // Save to Supabase
    const { error: dbError } = await supabaseAdmin
      .from("contact_submissions")
      .insert({ first_name: firstName, last_name: lastName, email, subject, message });

    if (dbError) console.error("Supabase insert error:", dbError);

    // Fire emails — await so errors are logged and visible
    const emailResults = await Promise.allSettled([
      transporter.sendMail({
        from: `"Socioryx Team" <${process.env.GMAIL_USER}>`,
        replyTo: process.env.GMAIL_USER,
        to: email,
        subject: "We received your message — Socioryx",
        html: clientEmailHtml(firstName, message),
      }),
      transporter.sendMail({
        from: `"Socioryx Contact Form" <${process.env.GMAIL_USER}>`,
        replyTo: email,
        to: process.env.GMAIL_USER!,
        subject: `New Contact: ${firstName} ${lastName} — ${subject}`,
        html: internalEmailHtml(firstName, lastName, email, subject, message),
      }),
    ]);

    emailResults.forEach((result, i) => {
      if (result.status === "rejected") {
        console.error(`Email ${i === 0 ? "client" : "internal"} send failed:`, result.reason);
      }
    });

    return NextResponse.json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "Failed to process form submission" }, { status: 500 });
  }
}
