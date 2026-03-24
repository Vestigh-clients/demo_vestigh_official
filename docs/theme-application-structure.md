# Theme Application Structure

## Scope
- A theme is visual only. Themes own colors, typography, radius, shadows, and component surface behavior.
- Brand and content are separate. Store identity, contact details, socials, and currency stay in [`src/config/branding.config.ts`](/c:/Users/agyek/bible/base/src/config/branding.config.ts). Homepage copy, footer links, auth media, and other editorial content live in [`src/config/content.config.ts`](/c:/Users/agyek/bible/base/src/config/content.config.ts).
- Admin users can switch only between repo-owned presets. Arbitrary in-app color editing is intentionally out of scope.

## Preset Structure
- Each preset lives under `src/themes/<preset-key>/`.
- Required files:
  - `src/themes/<preset-key>/preset.ts`
  - `src/themes/<preset-key>/fonts.css`
- Register each preset in [`src/themes/registry.ts`](/c:/Users/agyek/bible/base/src/themes/registry.ts).
- The configured default preset is set in [`src/config/branding.config.ts`](/c:/Users/agyek/bible/base/src/config/branding.config.ts) with `defaultThemePreset`.

## Required Tokens
- `ThemeTokens` must define:
  - `canvas`
  - `surface`
  - `surfaceAlt`
  - `surfaceStrong`
  - `textPrimary`
  - `textMuted`
  - `textInverse`
  - `border`
  - `borderStrong`
  - `primary`
  - `primaryForeground`
  - `accent`
  - `accentForeground`
  - `success`
  - `successForeground`
  - `danger`
  - `dangerForeground`
  - `navSolidBg`
  - `navSolidFg`
  - `navSolidInteractive`
  - `focusRing`
  - `shadowSoft`
- Typography must define:
  - `headingFamily`
  - `bodyFamily`
  - `headingFallback`
  - `bodyFallback`
- Radius must define:
  - `sm`
  - `md`
  - `lg`
  - `pill`

## How Presets Apply
- Storefront runtime branding resolves in [`src/config/storefront.config.ts`](/c:/Users/agyek/bible/base/src/config/storefront.config.ts).
- The storefront uses the public `site_settings.site_theme_preset` value when it is valid.
- If the runtime value is missing or invalid, the app falls back to `branding.config.ts` `defaultThemePreset`.
- [`src/contexts/ThemeContext.tsx`](/c:/Users/agyek/bible/base/src/contexts/ThemeContext.tsx) loads the active preset fonts, compiles CSS variables, and applies them to `document.documentElement`.

## Admin Preset Selection
- Admin theme selection is managed from [`src/pages/admin/AdminSettingsPage.tsx`](/c:/Users/agyek/bible/base/src/pages/admin/AdminSettingsPage.tsx).
- The setting key is `site_theme_preset`.
- Only keys registered in [`src/themes/registry.ts`](/c:/Users/agyek/bible/base/src/themes/registry.ts) should be saved.
- Public storefront reads are enabled by the migration [`supabase/migrations/20260324110000_storefront_theme_preset_and_public_branding.sql`](/c:/Users/agyek/bible/base/supabase/migrations/20260324110000_storefront_theme_preset_and_public_branding.sql).

## Email Branding
- Shared email branding resolves through [`src/themes/emailBrand.ts`](/c:/Users/agyek/bible/base/src/themes/emailBrand.ts).
- Supabase functions load the active preset and identity via [`supabase/functions/_shared/emailBrand.ts`](/c:/Users/agyek/bible/base/supabase/functions/_shared/emailBrand.ts).
- Email templates should use the shared snapshot for store name, colors, and fonts instead of hard-coded template values.

## Adding A New Theme
1. Create `src/themes/<preset-key>/preset.ts` with the full `ThemePreset` contract.
2. Create `src/themes/<preset-key>/fonts.css` and declare the font imports for that preset.
3. Register the preset in [`src/themes/registry.ts`](/c:/Users/agyek/bible/base/src/themes/registry.ts).
4. Optionally set it as `defaultThemePreset` in [`src/config/branding.config.ts`](/c:/Users/agyek/bible/base/src/config/branding.config.ts).
5. If admins should be able to choose it, no extra UI work is needed once it is registered.

## Validation Checklist
- The preset is registered and its key appears in the admin settings dropdown.
- `npm test` passes.
- `npm run build` passes.
- Navbar, footer, auth layout, product pages, and admin pages render with the new preset.
- Email templates use the correct store name, CTA colors, and typography.
- Homepage and footer content still come from `content.config.ts`, not from component-local constants.
