# Watt Pulse

Watt Pulse is a smart resource monitoring dashboard built with Next.js for tracking electricity usage, water usage, alerts, reports, and sustainability insights. The app includes authentication, theme switching, support/contact flows, callback requests, a chatbot widget, and a password reset flow with OTP delivery.

## Core Features

- Login and signup with MongoDB-backed user accounts
- Session-based authentication
- Dashboard pages for:
  - electricity
  - water
  - carbon footprint
  - reports
  - settings
  - notifications
  - mail/contact support
- Light and dark theme support
- Real-time style charts using ApexCharts
- Support contact form using EmailJS
- Callback request form using EmailJS plus lightweight local storage
- Forgot password flow with OTP-based verification
- Basic API rate limiting for auth, chat, contact, and callback routes
- Security headers and production-safe cookies
- SEO support with metadata, `robots.txt`, `sitemap.xml`, and `manifest.webmanifest`

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- MongoDB + Mongoose
- ApexCharts
- EmailJS
- Nodemailer

## Main Routes

- `/login`
- `/forgot-password`
- `/dashboard`
- `/electricity`
- `/water`
- `/carbon`
- `/reports`
- `/settings`
- `/notifications`
- `/mail`

## API Routes

- `/api/auth/login`
- `/api/auth/signup`
- `/api/auth/logout`
- `/api/auth/forgot-password/request`
- `/api/auth/forgot-password/verify`
- `/api/dashboard`
- `/api/settings`
- `/api/chat`
- `/api/contact`
- `/api/callback`

## Environment Variables

Create a `.env.local` file in the project root.

```env
MONGO_URI=<your-mongodb-uri>

OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini

OPENROUTER_API_KEY=
OPENROUTER_MODEL=openai/gpt-4o-mini

EMAILJS_SERVICE_ID=
EMAILJS_PUBLIC_KEY=
EMAILJS_TEMPLATE_ID=
EMAILJS_PRIVATE_KEY=

NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=

EMAIL_USER=
EMAIL_PASS=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Variable Notes

- `MONGO_URI`: required for users, sessions, telemetry, and reset OTP persistence
- `NEXT_PUBLIC_EMAILJS_*`: required for frontend EmailJS flows
- `EMAILJS_*`: kept for server-side EmailJS compatibility if needed
- `OPENAI_*` or `OPENROUTER_*`: optional, used by the chatbot
- `EMAIL_USER` and `EMAIL_PASS`: optional right now for server-side mailer fallback
- `NEXT_PUBLIC_APP_URL`: important for deployed sitemap and metadata URLs

## EmailJS Template Notes

The EmailJS template should support the variables used by the forms:

- `name`
- `email`
- `to_email`
- `from_name`
- `from_email`
- `reply_to`
- `title`
- `subject`
- `contact_subject`
- `message`
- `contact_message`
- `passcode`
- `time`

For OTP delivery, make sure the EmailJS template is configured with a dynamic recipient:

- `To Email`: `{{to_email}}` or `{{email}}`

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open:

[http://localhost:3000](http://localhost:3000)

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Data Notes

- App telemetry is loaded through the dashboard service layer
- Callback requests are also written to:

```text
data/callback-requests.json
```

## Security and Production Notes

The app already includes:

- session cookies with `httpOnly`
- `secure` cookies in production
- CSP, frame, referrer, and permissions headers
- basic in-memory rate limiting

Recommended before final public deployment:

1. Use HTTPS only
2. Set a real production `NEXT_PUBLIC_APP_URL`
3. Keep `.env.local` out of version control
4. Move OTP email delivery fully server-side if you want stricter enterprise-grade password reset security
5. Replace the in-memory rate limiter with Redis or another shared store if you deploy multiple instances
6. Audit EmailJS templates so recipient and OTP variables are correct

## Deployment Checklist

Before deploying:

1. Set all required env vars in your hosting platform
2. Run:

```bash
npm run lint
npm run build
```

3. Verify:
   - login/signup
   - forgot password OTP
   - contact form
   - callback request form
   - chatbot response path
   - theme switching
   - protected routes

## Current Status

Watt Pulse is set up as a polished MVP / deployable dashboard application with authentication, analytics UI, EmailJS-based support flows, and production-oriented hardening already in place.
