# Shots by Nemwel 📸🏔️

**Shots by Nemwel** is a personal brand and website focused on documenting hiking experiences, landscapes, and outdoor storytelling through short-form video and photography.

The platform complements my content on **TikTok** and **Instagram**, serving as a home for curated visuals, stories from the trail, and future long-form content.

---

## Purpose

This website exists to:

- Showcase hiking journeys and outdoor photography
- Tell stories behind the hikes, locations, and moments
- Act as a central home for content shared across social platforms
- Experiment with visual storytelling on the web

This is an evolving project and will grow alongside the brand.

---

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **pnpm** for package management

The stack is intentionally modern, fast, and minimal to keep focus on content and performance.

---

## Design & UX

The design and user experience are crafted in collaboration with  
**Rachael** - an incredible UI/UX designer transitioning into product design.

Her work shapes the visual direction, layout decisions, and overall feel of the site.

> Design by **[Rachael](https://www.linkedin.com/in/rachaelngotho/)** 🎨  
> Engineering by **[Nemwel](https://www.linkedin.com/in/nemwel-nyandoro/)** 🛠️

---

## Content Studio (admin)

All expeditions, gallery photos and trail notes are JSON records managed from a private studio, so content can change without a redeploy.

- **Where:** `/manage` in development. In production the studio is only reachable at `/<ADMIN_SLUG>` (see `.env.example`); without `ADMIN_SLUG` it is disabled.
- **Storage:** `content/*.json` in development. Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` and the same reads/writes go to Upstash (empty keys fall back to the JSON seed).
- **Images:** drop files into `public/assets/<folder>/...`, then pick the folder and file in the form. Records store the path relative to `public/assets`. Active records can't reference missing files.
- **Fields:** forms are generated from `lib/content/collections.ts`. Add a field there and it becomes editable and validated.
- **Metrics & export:** dashboard counts, missing/unused images, a printable PDF report and a JSON backup.

---

## Status

🚧 **Work in progress**

Features, layouts, and content will evolve over time as hikes, ideas, and experiments continue.

---

## Author

**Nemwel Boniface**  
Hiker • Builder • Storyteller

- TikTok: [Link](https://www.tiktok.com/@shotsbynemwel)
- Instagram: [Link](https://www.instagram.com/shotbynemwel/)

---

> Built with love for the mountains, the trail, and the moments in between.
