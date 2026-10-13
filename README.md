# International Movers and Storage

Marketing website for International Movers and Storage — packers & movers, international relocation and storage.
*Your Move • Our Global Reach*

Built with Next.js (App Router), Tailwind CSS v4 and Motion. Hosted on Vercel.

## Pages

- `/` — home with hero quote form
- `/services` and `/services/[slug]` — one SEO page per service
- `/about`, `/contact`, `/blog`
- `/privacy-policy`, `/terms-and-conditions`

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Configuration

- **Business details** (phone, email, address, stats) live in `src/lib/site.ts`.
- **Services and their page content** live in `src/lib/services.ts` and `src/lib/service-content.ts`.
- **Quote form email** is sent over SMTP from `src/app/api/quote/route.ts`. Copy `.env.example` to `.env.local` and fill in the SMTP values (Hostinger mailbox by default). On Vercel, set the same variables under Project → Settings → Environment Variables.
