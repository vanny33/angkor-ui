# Angkor UI

Angkor UI is a bilingual Khmer/English React component library with accessible, animated components and adaptable color themes.

## Packages

- `@angkor-ui/react` — reusable React components and theme styles.
- `angkor-ui` — CLI for initializing a project and adding components.
- `apps/docs` — the bilingual documentation and component playground.

## Getting started

Install the CLI and initialize Angkor UI in your project:

```bash
npx angkor-ui@latest init
```

Install the React package with its peer dependencies:

```bash
npm install @angkor-ui/react react react-dom tailwindcss
```

Import the theme stylesheet once in your application entry point:

```tsx
import "@angkor-ui/react/styles/themes.css";
```

Then use components in your UI:

```tsx
import { Button } from "@angkor-ui/react";

export function SaveButton() {
  return <Button>Save changes</Button>;
}
```

## Development

This repository uses pnpm workspaces.

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm build
pnpm test
pnpm typecheck
```

## Themes

The documentation app includes light and dark modes, plus Default, Angkor Gold, Bayon Stone, Mekong Blue, and Royal Red palettes. Theme values are exposed through CSS variables, so components stay consistent across palettes.

## License

MIT. See [LICENSE](LICENSE).
