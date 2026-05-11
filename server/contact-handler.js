const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = {
  name: 120,
  email: 180,
  subject: 200,
  message: 5000,
  topic: 80
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map();

function clampAndClean(value, maxLength) {
  return String(value ?? '')
    .replace(/\0/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .slice(0, maxLength);
}

function normalizeLang(lang) {
  return lang === 'de' || lang === 'zh-Hant' ? lang : 'en';
}

function getIpAddress(rawIp) {
  if (!rawIp) return 'unknown';
  const first = String(rawIp).split(',')[0]?.trim();
  return first || 'unknown';
}

function checkRateLimit(clientIp) {
  if (!clientIp || clientIp === 'unknown') return { ok: true };

  const now = Date.now();
  const existing = rateLimitStore.get(clientIp) ?? [];
  const recent = existing.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(clientIp, recent);
    return { ok: false };
  }

  recent.push(now);
  rateLimitStore.set(clientIp, recent);
  return { ok: true };
}

function validationError(message, status = 400) {
  return {
    ok: false,
    status,
    body: {
      ok: false,
      error: message
    }
  };
}

function buildOwnerEmailText({ name, email, subject, message, timestamp, topic }) {
  return [
    'New inquiry from Gemelli in Harmonia website',
    '',
    'Name:',
    name,
    '',
    'Email:',
    email,
    '',
    'Subject:',
    subject,
    '',
    'Inquiry type:',
    topic || 'General inquiry',
    '',
    'Message:',
    message,
    '',
    'Submitted at:',
    timestamp,
    '',
    'Source:',
    'gemilli-in-harmonia.com'
  ].join('\n');
}

function buildConfirmationTemplate(lang, { name, email, subject, message, timestamp }) {
  if (lang === 'de') {
    return {
      subject: 'Vielen Dank für Ihre Nachricht an Gemelli in Harmonia',
      text: [
        `Sehr geehrte/r ${name},`,
        '',
        'vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und werden uns so bald wie möglich bei Ihnen melden.',
        '',
        'Hier ist eine Kopie Ihrer übermittelten Nachricht:',
        '',
        'Name:',
        name,
        '',
        'E-Mail:',
        email,
        '',
        'Betreff:',
        subject,
        '',
        'Nachricht:',
        message,
        '',
        'Gesendet am:',
        timestamp,
        '',
        'Mit freundlichen Grüßen',
        'Gemelli in Harmonia',
        'gemilli-in-harmonia.com'
      ].join('\n')
    };
  }

  if (lang === 'zh-Hant') {
    return {
      subject: '感謝您聯絡 Gemelli in Harmonia',
      text: [
        `親愛的 ${name}：`,
        '',
        '感謝您的來信。我們已收到您的訊息，並會盡快回覆您。',
        '',
        '以下是您提交的訊息副本：',
        '',
        '姓名：',
        name,
        '',
        '電子郵箱：',
        email,
        '',
        '主題：',
        subject,
        '',
        '訊息內容：',
        message,
        '',
        '提交時間：',
        timestamp,
        '',
        '謹致問候，',
        'Gemelli in Harmonia',
        'gemilli-in-harmonia.com'
      ].join('\n')
    };
  }

  return {
    subject: 'Thank you for contacting Gemelli in Harmonia',
    text: [
      `Dear ${name},`,
      '',
      'Thank you for your message. We have received your inquiry and will get back to you as soon as possible.',
      '',
      'Here is a copy of the message you submitted:',
      '',
      'Name:',
      name,
      '',
      'Email:',
      email,
      '',
      'Subject:',
      subject,
      '',
      'Message:',
      message,
      '',
      'Submitted at:',
      timestamp,
      '',
      'With best wishes,',
      'Gemelli in Harmonia',
      'gemilli-in-harmonia.com'
    ].join('\n')
  };
}

async function sendResendEmail(apiKey, payload) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend request failed: ${response.status} ${errorText}`);
  }

  return response.json();
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

export async function processContactSubmission({ body, env, clientIp }) {
  const apiKey = String(env.RESEND_API_KEY ?? '').trim();
  const contactEmail = String(env.CONTACT_EMAIL ?? 'musical_kelvin@yahoo.com.hk').trim();
  const fromEmail = String(env.FROM_EMAIL ?? '').trim();

  const name = clampAndClean(body?.name, LIMITS.name);
  const email = clampAndClean(body?.email, LIMITS.email).toLowerCase();
  const subject = clampAndClean(body?.subject, LIMITS.subject);
  const message = clampAndClean(body?.message, LIMITS.message);
  const topic = clampAndClean(body?.topic, LIMITS.topic);
  const lang = normalizeLang(body?.lang);
  const honeypot = clampAndClean(body?.botField ?? body?.bot ?? '', 200);
  const createdAt = Number(body?.createdAt ?? 0);

  if (honeypot) {
    return {
      ok: true,
      status: 200,
      body: {
        ok: true
      }
    };
  }

  if (!name || !email || !subject || !message) {
    return validationError('Missing required fields.', 400);
  }

  if (!EMAIL_REGEX.test(email)) {
    return validationError('Invalid email address.', 400);
  }

  if (createdAt && Date.now() - createdAt < 1200) {
    return validationError('Submission rejected.', 400);
  }

  if (!checkRateLimit(getIpAddress(clientIp)).ok) {
    return validationError('Too many requests. Please try again later.', 429);
  }

  if (!apiKey || !contactEmail || !fromEmail) {
    return validationError('Email service is not configured.', 500);
  }

  const timestamp = new Date().toISOString();
  const ownerText = buildOwnerEmailText({ name, email, subject, message, timestamp, topic });
  const confirmation = buildConfirmationTemplate(lang, { name, email, subject, message, timestamp });

  try {
    await sendResendEmail(apiKey, {
      from: fromEmail,
      to: [contactEmail],
      subject: 'New inquiry from Gemelli in Harmonia website',
      text: ownerText,
      reply_to: email
    });

    await sendResendEmail(apiKey, {
      from: fromEmail,
      to: [email],
      subject: confirmation.subject,
      text: confirmation.text
    });

    return {
      ok: true,
      status: 200,
      body: {
        ok: true
      }
    };
  } catch (error) {
    console.error('Contact form email send failed', error);
    return validationError('Could not send emails.', 502);
  }
}

export function getClientIpFromRequest(req) {
  return getIpAddress(req.headers['x-forwarded-for'] ?? req.socket?.remoteAddress ?? '');
}

// TODO: For production-scale abuse protection, replace the in-memory limiter above
// with a durable store or edge-based rate limiting service.
