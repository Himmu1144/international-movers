import nodemailer from "nodemailer";
import { site } from "@/lib/site";

// Sends quote enquiries over SMTP — works with Brevo, Hostinger, Gmail etc. (switch by changing env vars only).
// Env vars (Vercel → Project → Settings → Environment Variables):
//   SMTP_HOST   e.g. smtp-relay.brevo.com | smtp.hostinger.com
//   SMTP_PORT   587 (Brevo) | 465 (Hostinger/Gmail)
//   SMTP_USER   SMTP login
//   SMTP_PASS   SMTP key / password
//   SMTP_FROM   sender address, e.g. website@theirdomain.com (defaults to SMTP_USER)
//   QUOTE_TO    inbox that receives enquiries (defaults to SMTP_FROM)

const clean = (v: unknown, max = 200) =>
  String(v ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (clean(body.company)) return Response.json({ ok: true });

  const data = {
    name: clean(body.name, 80),
    phone: clean(body.phone, 20),
    from: clean(body.from, 120),
    to: clean(body.to, 120),
    service: clean(body.service, 60),
    page: clean(body.page, 200),
  };

  if (!data.name || !/^[0-9+\s-]{10,16}$/.test(data.phone) || !data.from || !data.to) {
    return Response.json({ ok: false, error: "Please fill in all fields with a valid mobile number." }, { status: 422 });
  }

  const { SMTP_USER, SMTP_PASS, QUOTE_TO, SMTP_HOST = "smtp-relay.brevo.com", SMTP_PORT = "587" } = process.env;
  const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("[quote] SMTP_USER / SMTP_PASS not configured");
    return Response.json({ ok: false, error: "Enquiries are temporarily unavailable. Please call us." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Mobile", data.phone],
    ["Moving from", data.from],
    ["Moving to", data.to],
    ["Service", data.service],
    ["Sent from page", data.page],
  ];

  const digits = data.phone.replace(/\D/g, "");
  const waNumber = digits.length === 10 ? `91${digits}` : digits;

  try {
    await transporter.sendMail({
      from: `"${site.shortName} Website" <${SMTP_FROM}>`,
      to: QUOTE_TO || SMTP_FROM,
      subject: `New quote request: ${data.service} — ${data.name}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px">
          <h2 style="color:#003267;margin:0 0 12px">New quote request</h2>
          <table style="border-collapse:collapse;width:100%">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f5f8fb;color:#5a6779;width:140px">${k}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;color:#13233a"><b>${escapeHtml(v)}</b></td></tr>`,
              )
              .join("")}
          </table>
          <p style="margin:16px 0 0">
            <a href="tel:${digits}" style="background:#00a098;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Call ${escapeHtml(data.phone)}</a>
            &nbsp;
            <a href="https://wa.me/${waNumber}" style="background:#25D366;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">WhatsApp</a>
          </p>
        </div>`,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[quote] send failed", err);
    return Response.json({ ok: false, error: "Couldn’t send right now. Please call or WhatsApp us." }, { status: 502 });
  }
}
