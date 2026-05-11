# Contact Form Setup

This project now uses a real contact form backed by:

- Vercel Functions
- Resend
- the production domain `gemilli-in-harmonia.com`

## What the form does

When a visitor submits the form successfully:

1. An inquiry email is sent to `musical_kelvin@yahoo.com.hk`
2. A confirmation email is sent to the visitor
3. The confirmation email includes a full copy of the submitted content
4. The frontend shows success only after the backend reports real success

## Required environment variables

Add these in the main Vercel project:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=musical_kelvin@yahoo.com.hk
FROM_EMAIL=Gemelli in Harmonia <contact@gemilli-in-harmonia.com>
```

## Important notes

- Add `RESEND_API_KEY` in Vercel Project Settings -> Environment Variables
- Do not commit a real API key to GitHub
- After adding or changing environment variables in Vercel, redeploy the project
- `FROM_EMAIL` requires domain verification in Resend for `gemilli-in-harmonia.com`

## Temporary sender before domain verification

If the production domain has not been verified in Resend yet, use:

```env
FROM_EMAIL=Gemelli in Harmonia <onboarding@resend.dev>
```

After verifying the domain, switch back to:

```env
FROM_EMAIL=Gemelli in Harmonia <contact@gemilli-in-harmonia.com>
```

## Files involved

- `api/contact.js`
- `server/contact-handler.js`
- `src/pages/ContactPage.tsx`
- `.env.example`

## Local development

For local form testing, create a local env file yourself and add the same variables there.

Do not commit real secrets.

If `RESEND_API_KEY` or `FROM_EMAIL` is missing, the backend will return an error and the frontend will show the localized error message instead of a fake success state.

## Anti-spam protections

The contact form includes:

- required field validation
- email validation
- length limits
- a hidden honeypot field
- a simple in-memory rate limiter

Note:

- the current rate limiter is a lightweight server-memory guard
- for stronger production protection, a durable rate-limiting service should be added later
