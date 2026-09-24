# Sourabh Rajput — Cinematic 3D Portfolio

Premium dark futuristic developer portfolio built with **Next.js 16**, **React Three Fiber**, **GSAP**, **Framer Motion**, and **Tailwind CSS**.

## Run locally

```bash
cd sourabh-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content

All portfolio copy lives in structured constants:

| File | Purpose |
|------|---------|
| `src/data/site.ts` | Name, bio, focus, nav |
| `src/data/projects.ts` | VayuDhara, CodeSync, AgroNova |
| `src/data/skills.ts` | Skill cards |
| `src/data/experience.ts` | Timeline (add achievements here) |
| `src/data/education.ts` | Degree & coursework |
| `src/data/contact.ts` | Email, WhatsApp, socials, chat presets |

Resume PDF: `public/Sourabh_Rajput_Resume.pdf`

## Connect chat

The floating **Let's Connect** panel uses `mailto:` and WhatsApp deep links (no fake backend).  
Future API: `POST /api/contact` stub in `src/app/api/contact/route.ts`.

## Notes

- 3D hero is procedural (desk/monitor/workspace) for fast load — no heavy GLBs.
- LinkedIn / GitHub project URLs can be updated in data files when final links are ready.
