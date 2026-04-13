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
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>We got your message</title></head>
<body style="margin:0;padding:0;background-color:#0f1419;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0f1419;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

      <!-- Header -->
      <tr><td style="background-color:#E5E4E2;padding:24px 36px;">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:900;letter-spacing:-0.5px;color:#0f1419;">SOCIORYX</p>
      </td></tr>

      <!-- Body -->
      <tr><td style="background-color:#151a21;padding:36px;">
        <h1 style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:#F8F8FF;">Hey ${firstName}, we got it.</h1>
        <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#B8C5D6;">
          Thanks for reaching out to <strong style="color:#F8F8FF;">Socioryx</strong>. We'll get back to you within <strong style="color:#E5E4E2;">24 hours</strong>.
        </p>

        <!-- Message block -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
          <tr>
            <td style="border-left:3px solid #E5E4E2;background-color:#0f1419;padding:14px 18px;">
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#B8C5D6;">Your message</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#B8C5D6;">${message}</p>
            </td>
          </tr>
        </table>

        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#B8C5D6;">
          In the meantime, check out our work at <a href="https://socioryx.com" style="color:#E5E4E2;text-decoration:none;">socioryx.com</a>
        </p>
      </td></tr>

      <!-- Divider -->
      <tr><td style="background-color:#151a21;padding:0 36px;">
        <hr style="border:none;border-top:1px solid #1a1f26;margin:0;" />
      </td></tr>

      <!-- Footer -->
      <tr><td style="background-color:#151a21;padding:20px 36px;">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#B8C5D6;opacity:0.4;">© ${new Date().getFullYear()} Socioryx. All rights reserved.</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body></html>`;
}

function internalEmailHtml(firstName: string, lastName: string, email: string, subject: string, message: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Contact</title></head>
<body style="margin:0;padding:0;background-color:#0f1419;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0f1419;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

      <!-- Header -->
      <tr><td style="background-color:#E5E4E2;padding:18px 36px;">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#0f1419;">New Enquiry — Socioryx</p>
      </td></tr>

      <!-- Details -->
      <tr><td style="background-color:#151a21;padding:32px 36px;">

        <!-- Name row -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:0;">
          <tr>
            <td width="90" style="padding:12px 0;border-bottom:1px solid #1a1f26;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#B8C5D6;vertical-align:top;">Name</td>
            <td style="padding:12px 0;border-bottom:1px solid #1a1f26;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#F8F8FF;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td width="90" style="padding:12px 0;border-bottom:1px solid #1a1f26;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#B8C5D6;vertical-align:top;">Email</td>
            <td style="padding:12px 0;border-bottom:1px solid #1a1f26;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#F8F8FF;"><a href="mailto:${email}" style="color:#E5E4E2;text-decoration:none;">${email}</a></td>
          </tr>
          <tr>
            <td width="90" style="padding:12px 0;border-bottom:1px solid #1a1f26;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#B8C5D6;vertical-align:top;">Service</td>
            <td style="padding:12px 0;border-bottom:1px solid #1a1f26;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#F8F8FF;">${subject}</td>
          </tr>
        </table>

        <!-- Message block -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
          <tr>
            <td style="border-left:3px solid #E5E4E2;background-color:#0f1419;padding:14px 18px;">
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#B8C5D6;">Message</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#B8C5D6;">${message}</p>
            </td>
          </tr>
        </table>

      </td></tr>

      <!-- Footer -->
      <tr><td style="background-color:#151a21;padding:0 36px;">
        <hr style="border:none;border-top:1px solid #1a1f26;margin:0;" />
      </td></tr>
      <tr><td style="background-color:#151a21;padding:18px 36px;">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#B8C5D6;opacity:0.4;">Socioryx · socioryx.com</p>
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
