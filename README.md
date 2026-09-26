# Goal GM — Authority Demo Prototype

Interactive prototype for Gambian football live scores. Opens on the **fan app** by default. Staff admin is available at `/admin` (type the URL).

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) → redirects to fan app (`/app`).

| URL | Role |
|-----|------|
| `/` or `/app` | Fan mobile app |
| `/admin` | Admin / score reporter panel |

### Admin demo logins

- `reporter@goalgm.gm` — Score Reporter (live control)
- `amie@goalgm.gm` — Super Admin
- `data@goalgm.gm` — Data Editor
- `news@goalgm.gm` — News Editor

### Suggested walkthrough

1. Fan onboarding → Home live scores → open Real vs Hawks.
2. **Lineups** — one shared pitch (away top, home bottom) with player photos.
3. Leagues, player profiles, news photos, archive, notifications.
4. Go to `/admin`, sign in as reporter, add a goal — return to the fan match to see it.

## Notes

Clickable React demo with mock data (not Flutter/Firebase production). Images use Unsplash (news) and avatar services (players/crests) for the demo.

## Stack

React + TypeScript + Vite + React Router
