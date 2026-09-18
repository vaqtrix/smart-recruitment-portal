# Smart Recruitment Portal — Next.js Edition

Web Engineering — Assignment 3. A recruitment portal where candidates apply online and an
admin reviews applications on a dashboard. The original brief targeted **ASP.NET Core MVC**;
with the instructor’s permission the same requirements are built with **Next.js** so the app
can be deployed live on **Vercel**.

## How the assignment maps to this project

| ASP.NET Core MVC (brief) | This project |
|---|---|
| MVC framework | Next.js (App Router) with file-based routing |
| Model (candidate data) | `app/lib/model.js` — data shape + validation + statuses |
| Controller / business logic | `app/lib/store.js` — the only place that reads/writes data |
| View (Razor pages) | React pages & components (`.jsx`) |
| Bootstrap UI | Bootstrap 5 |
| Data storage | Browser storage (works on Vercel with no setup) |

## Features

- **Candidate recruitment form** (`/apply`) with full validation.
- **Admin dashboard** (`/admin`) listing every application.
- **Search** by name, email or position.
- **Accept / Reject** actions that update a candidate’s status.
- **Status management** — Pending / Accepted / Rejected badges + live stat cards.
- **Responsive Bootstrap UI** across all pages.
- Demo applications are seeded automatically so the dashboard isn’t empty.

## Pages

| Route | What it does |
|-------|--------------|
| `/` | Landing page — hero, workflow, links |
| `/apply` | Candidate application form |
| `/admin` | Admin dashboard (search, filter, accept/reject) |

---

## Requirements

- **Node.js 18+** — install from <https://nodejs.org>. Check with `node -v`.

## Run locally

```bash
npm install     # first time only
npm run dev
```
Open <http://localhost:3000> in your browser.

To try the flow: go to **Apply**, submit an application, then open **Admin** and you’ll see it
listed as *Pending* — accept or reject it and watch the status and stats update.

---

## Push to GitHub

Create a new empty repository on GitHub, then inside this folder:

```bash
git init
git add .
git commit -m "Smart Recruitment Portal - Next.js"
git branch -M main
git remote add origin https://github.com/USERNAME/smart-recruitment-portal.git
git push -u origin main
```
(Replace `USERNAME` with your GitHub username.)

`node_modules` and `.next` are in `.gitignore`, so they won’t be pushed — that is correct.
Vercel installs and builds everything itself.

---

## Deploy on Vercel

1. Go to <https://vercel.com> and sign in with GitHub.
2. **Add New → Project** → import your `smart-recruitment-portal` repo.
3. Vercel auto-detects **Next.js** — no settings needed.
4. Click **Deploy**. In about a minute you’ll get a live URL.

---

## Important note on data storage

Applications are saved in the browser’s local storage. This makes the portal fully functional
on Vercel **without any database setup** — perfect for a demo and for grading on a single
machine. The trade-off is that data lives per-browser (an application submitted on one device
won’t appear on another).

To make it multi-user, only `app/lib/store.js` needs to change — swap the local-storage calls
for a database (e.g. Vercel Postgres or Supabase). The rest of the app already calls the store
through clean functions (`getCandidates`, `addCandidate`, `setStatus`, `searchCandidates`),
so nothing else has to change.

---

## Folder overview

```
smart-recruitment-portal/
└── app/
    ├── page.jsx            # home / landing
    ├── layout.jsx          # Bootstrap + navbar shell
    ├── apply/page.jsx      # candidate form (validation)
    ├── admin/page.jsx      # dashboard (search, accept/reject, stats)
    ├── components/         # Navbar, StatusBadge
    └── lib/
        ├── model.js        # data shape, validation, statuses, seed data
        └── store.js        # data layer (list / add / setStatus / search)
```
