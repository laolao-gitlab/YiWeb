# Website Editing Guide

This guide is for the two artists who update the Gemelli in Harmonia website.

You do not need to edit code for normal content updates.

## The Easy Way: Use `/admin`

Open:

- `https://your-website-address.com/admin`

If you are working locally on the same computer, open:

- `http://localhost:3000/admin`

On the admin screen:

1. Log in
2. Click the section you want to edit
3. Change the text or links
4. Click `Save`
5. Click `Publish`

## What Each Admin Section Means

### `Site Content`

Edit here if you want to change:

- homepage title
- homepage introduction
- duo introduction
- artistic mission
- repertoire text

### `Artists`

Edit here if you want to change:

- Yi Liu biography
- Kelvin Tsui biography
- artist titles
- homepage artist preview text

### `Season Events`

Edit here if you want to change:

- concert title
- concert month or date
- location
- short event description

To add a new event:

1. Open `Season Events`
2. Add a new item in the event list
3. Fill in the title, date, place, and text
4. Save and publish

### `Media`

Edit here if you want to change:

- media section intro
- photo captions
- photo alt text
- YouTube video links
- video titles
- media copyright note

To add a new photo:

1. Ask the developer to place the image file inside `public/image/`
2. Open `Media`
3. Add a new item in `Media Images`
4. Enter the image path like `/image/your-photo-name.jpg`
5. Add the title, caption, and alt text
6. Save and publish

To add a new YouTube video:

1. Open `Media`
2. Add a new item in `YouTube Videos`
3. Paste the embed link
4. Add the video title
5. Save and publish

Important:

- Use the embed format:
  `https://www.youtube.com/embed/VIDEO_ID`
- Do not use a normal watch link like `youtube.com/watch?...`

### `Contact and Legal`

Edit here if you want to change:

- contact email
- Instagram handle
- Instagram URL
- contact text
- Impressum / imprint text
- Datenschutz / privacy text
- footer legal line
- media copyright contact wording

## Languages

Each text usually appears in three versions:

- `en` = English
- `de` = German
- `zh-Hant` = Traditional Chinese

When you edit a text, try to update all three languages.

## Current Real Contact Details

These are the real details now used on the website:

- Email: `musical_kelvin@yahoo.com.hk`
- Instagram handle: `yi.earlymusic`
- Instagram URL: `https://www.instagram.com/yi.earlymusic/`

LinkedIn is intentionally not used on this website.

## Contact Form Test Recipient

The public website contact email remains:

- `musical_kelvin@yahoo.com.hk`

For temporary contact form testing, the backend recipient is controlled by the environment variable `CONTACT_EMAIL`.

Current testing value:

```env
CONTACT_EMAIL=Li.Minghao@campus.lmu.de
```

Before final production launch, change it back to:

```env
CONTACT_EMAIL=musical_kelvin@yahoo.com.hk
```

## Very Important Image Rules

Do not change these special image assignments unless you intentionally replace the same official portrait file:

- Homepage hero:
  `/image/hero.png`
- Yi Liu portrait:
  `/image/artists/liuyi/liuyi-portrait-studio.jpg`
- Kelvin Tsui portrait:
  `/image/artists/kelvin/kelvin-portrait-studio.jpg`

All other performance images belong only in the `Media` section.

## Local Testing for the Developer

If a developer wants to test the admin locally, use two terminals.

Terminal 1:

```bash
npm run dev:admin
```

Terminal 2:

```bash
npm run cms:proxy
```

Then open:

- `http://localhost:3000/admin`

## If `/admin` Login Does Not Work Yet

The website is already prepared for Decap CMS, but the live login still depends on hosting setup.

Important:

- `/admin` should open the editor
- if needed, `/admin/` also works and points to the same static admin folder

For the live admin to work, the deployment should provide:

- Netlify Identity
- Git Gateway

or another Decap-compatible login system.

The admin files are:

- `public/admin/index.html`
- `public/admin/config.yml`

## Where the Website Content Is Stored

If a developer needs to edit the content files directly, they are here:

- `src/content/data/site.json`
- `src/content/data/artists.json`
- `src/content/data/events.json`
- `src/content/data/media.json`
- `src/content/data/contact.json`
- `src/content/data/seo.json`

## File Naming for New Images

Please use:

- lowercase letters
- hyphens
- no spaces

Good examples:

- `gemelli-live-venice.jpg`
- `yi-liu-orfeo-costume.jpg`
- `kelvin-harpsichord-recital.jpg`

## If You Are Not Sure

If you only want to change text, links, event details, or video links, use `/admin`.

If you need to add new image files or fix something technical, ask the developer.
