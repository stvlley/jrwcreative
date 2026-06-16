# JRW Creative

Next.js site for JRW Creative Group.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project Layout

- `src/` - application routes, components, content, and library code
- `public/assets/` - web-facing images used by the site
- `docs/` - project specs, SOW files, PDFs, and reference assets
- `scripts/` - local helper scripts

## SOW Document

The SOW source lives in `docs/SOW_JRW_Creative_Group_Landing_Page_StrideTechworks.md`.
Regenerate the DOCX with:

```bash
python3 scripts/build_jrw_sow_docx.py
```
