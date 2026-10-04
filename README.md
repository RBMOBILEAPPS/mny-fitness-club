# M&Y Fitness Club

Premium static Next.js website for the Jaipur fitness club.

Repository: `RBMOBILEAPPS/mny-fitness-club`. GitHub Pages uses GitHub Actions.
The Pages API is the authority for the public URL. Default build settings target
`https://rbmobileapps.github.io/mny-fitness-club/` with base path `/mny-fitness-club`.

The workflow gets the URL and base path from `actions/configure-pages`, runs type
checking, builds the static `out/` export, verifies routes/assets and publishes the
Pages artifact. Push to `main` to update the public site.

```sh
npm ci
npm run typecheck
npm run build
node scripts/verify-export.mjs
```

GitHub Pages serves HTML/CSS/JS only. The custom image loader uses committed local
WebP variants. Contact actions and validated enquiry drafts work in the browser.
No server actions, API routes, sessions or sign-in service are required.
An optional club-owned HTTPS lead endpoint can be configured at build time;
without it, the form prepares an email draft and offers the club booking link.
