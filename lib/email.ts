import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  pool: true,
  maxConnections: 3,
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildReportEmailHtml(
  name: string,
  website: string,
  score: number,
  findings: { type: string; text: string }[],
  reportUrl: string
): string {
  const safeName = escapeHtml(name);
  const safeWebsite = escapeHtml(website);
  const scoreColor = score >= 70 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444";
  const scoreLabel = score >= 70 ? "Strong" : score >= 50 ? "Needs Work" : "Critical";

  const findingsHtml = findings
    .map(
      (f, i) =>
        `<tr${i < findings.length - 1 ? ` style="border-bottom:1px solid #1a1f26;"` : ""}>
          <td style="padding:14px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#B8C5D6;line-height:1.5;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width:24px;vertical-align:top;padding-top:1px;">
                  <span style="font-size:16px;${f.type === "positive" ? "color:#22c55e;font-weight:700;" : "color:#eab308;font-weight:700;"}">${f.type === "positive" ? "✓" : "⚠"}</span>
                </td>
                <td style="padding-left:8px;">${escapeHtml(f.text)}</td>
              </tr>
            </table>
          </td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your Socioryx AI Marketing Audit</title></head>
<body style="margin:0;padding:0;background-color:#0f1419;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0f1419;padding:32px 12px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

      <!-- Header bar -->
      <tr><td style="background-color:#E5E4E2;padding:20px 32px;border-radius:12px 12px 0 0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:900;letter-spacing:-0.5px;color:#0f1419;">SOCIORYX</td>
            <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#0f1419/70;">AI Audit</td>
          </tr>
        </table>
      </td></tr>

      <!-- Hero section -->
      <tr><td style="background-color:#151a21;padding:40px 32px;text-align:center;">
        <h1 style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:26px;font-weight:800;color:#F8F8FF;letter-spacing:-0.3px;">Your AI Marketing Audit is Ready</h1>
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#B8C5D6;">Website analyzed: <strong style="color:#E5E4E2;">${safeWebsite}</strong></p>
        <p style="margin:0 0 32px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6B7280;">Hey ${safeName}, your comprehensive marketing audit is ready.</p>

        <!-- Score — clean bordered circle -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 32px;">
          <tr>
            <td style="width:130px;height:130px;border-radius:50%;border:4px solid ${scoreColor};text-align:center;vertical-align:middle;">
              <span style="font-size:40px;font-weight:900;color:#F8F8FF;font-family:Arial,Helvetica,sans-serif;line-height:130px;">${score}</span>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:${scoreColor};letter-spacing:0.05em;text-transform:uppercase;">${scoreLabel}</p>
        <p style="margin:0 0 32px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6B7280;">out of 100 — overall marketing score</p>

        <!-- Divider -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="height:1px;background-color:#1a1f26;margin-bottom:28px;"></td></tr></table>

        <!-- Section heading -->
        <p style="margin:24px 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#B8C5D6;text-align:left;">Top Findings</p>

        <!-- Findings -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
          ${findingsHtml}
        </table>

        <!-- Divider -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="height:1px;background-color:#1a1f26;margin-bottom:28px;"></td></tr></table>

        <!-- CTA — big, bold, centered -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin:28px auto 0;">
          <tr>
            <td style="border-radius:10px;background-color:#E5E4E2;padding:0;">
              <a href="${escapeHtml(reportUrl)}" style="display:inline-block;padding:18px 48px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#0f1419;text-decoration:none;letter-spacing:0.3px;border-radius:10px;">View Full Report →</a>
            </td>
          </tr>
        </table>

        <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#6B7280;line-height:1.4;">
          Your report includes detailed SEO insights, conversion opportunities,<br>
          content recommendations, branding analysis, and a 30-day growth roadmap.
        </p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background-color:#151a21;padding:0 32px;border-radius:0 0 12px 12px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="height:1px;background-color:#1a1f26;"></td></tr></table>
      </td></tr>
      <tr><td style="background-color:#151a21;padding:20px 32px 32px;border-radius:0 0 12px 12px;">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#6B7280;line-height:1.6;">
          <strong style="color:#B8C5D6;">Socioryx</strong> — Full-service content marketing agency<br>
          <a href="https://socioryx.com" style="color:#E5E4E2;text-decoration:none;">socioryx.com</a> · No spam. No sales pressure. Just actionable insights.
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body></html>`;
}

export async function sendReportEmail(
  name: string,
  email: string,
  website: string,
  score: number,
  findings: { type: string; text: string }[],
  reportUrl: string
): Promise<void> {
  const html = buildReportEmailHtml(name, website, score, findings, reportUrl);

  await transporter.sendMail({
    from: `"Socioryx" <${process.env.GMAIL_USER}>`,
    replyTo: process.env.GMAIL_USER,
    to: email,
    subject: "Your Socioryx AI Marketing Audit is Ready",
    html,
  });
}
