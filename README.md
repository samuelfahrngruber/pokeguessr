# Pokeguessr

Guess Pokémon by their Pokédex number. Built with Vue 3, TypeScript, and Vite.

## Development

Use Node.js 24.

```sh
npm ci
npm run dev
```

- `npm run build` — type-check and build the site into `dist/`.
- `npm run preview` — preview the production build locally.
- `npm run lint` — lint and fix code.
- `npm run format` — format files in `src/`.

## GitHub Pages

In the repository's **Settings → Pages → Build and deployment**, select
**GitHub Actions** as the source. The [deployment workflow](.github/workflows/pages.yml)
builds and publishes the site on pushes to `main` and can also be run manually.

Site: https://samuelfahrngruber.github.io/pokeguessr/

The `base` in `vite.config.ts` matches the repository's `/pokeguessr` path;
update it if the repository is renamed.
