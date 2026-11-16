# Component library rules

- Keep every component self-contained under components/<slug>. No imports from portfolio files or sibling component folders.
- Use CSS classes and @apply in each local styles.css; avoid Tailwind utilities in JSX.
- Use Hugeicons. Preserve Plus Jakarta Sans typography.
- Each index.tsx supplies its own sizing container and exactly one local feedback provider. Keep common feedback helper copies consistent.
- Keep actual interaction state visible; do not imply demo bookings/messages are real.
- Document dependencies, setup, and usage in each component README.
- Run npm run check after component changes. Browser verification and clean consumer installation are separate checks.
- Do not invent credits or permissions. Track pending sources in ASSET_CREDITS.md.
