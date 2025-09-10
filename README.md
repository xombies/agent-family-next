# The Agent Family — Next.js (App Router)

This is a minimal Next.js 14 project that packages your Agent Family Lobby component with Tailwind, Framer Motion, and local UI components compatible with your shadcn-style imports.

## Quick Start
```bash
npm install
npm run dev
```

## Deploy to Vercel
1. Create a new repo and push these files.
2. Import the repo into Vercel (vercel.com/new), Framework = **Next.js**.
3. Deploy. Done.

## Connect GoDaddy Domain
- In Vercel project → **Settings → Domains** → add `yourdomain.com` and `www.yourdomain.com`.
- In GoDaddy → DNS → add CNAME for `www` to `cname.vercel-dns.com` (Vercel will show exact target).
- (Optional) Add A records for apex per Vercel instructions.

## Notes
- shadcn/ui imports are satisfied via local light-weight components in `components/ui/` (no Radix runtime required).
- Edit the lobby content in `components/AgentFamilyLobby.tsx`.
```
