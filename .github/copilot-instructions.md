# Copilot Instructions for SASGoal

## Project Overview
SASGoal is a web-based project organized by domain: `competitions`, `leagues`, and `main`. The structure is primarily static HTML, with folders for future expansion (`components`, `script`, `style`). The project appears to be focused on sports or event management, with pages for competitions and leagues.

## Key Directories & Files
- `pages/mainindex.html`: Main landing page. Entry point for navigation.
- `pages/main/competitions.html`, `pages/main/leagues.html`: Main views for competitions and leagues.
- `pages/competitions/teams/`, `pages/leagues/teams/`: Reserved for team-specific content (currently empty).
- `components/`, `script/`, `style/`: Intended for reusable UI, JS, and CSS (currently empty).
- `images/`: Placeholder for static assets.

## Architecture & Patterns
- **Static Site Structure**: No backend or build system detected. All navigation is via HTML pages.
- **Domain Separation**: Each major domain (competitions, leagues) has its own folder and HTML entry point.
- **Expansion Ready**: Empty folders suggest planned modularization (components, scripts, styles).

## Developer Workflows
- **No build/test commands required**: Directly edit HTML/CSS/JS files. Open HTML files in browser for preview.
- **No package management or external dependencies detected**: Add libraries by including CDN links in HTML if needed.
- **Debugging**: Use browser dev tools for inspection and debugging.

## Project-Specific Conventions
- **File Naming**: Use lowercase and hyphens for HTML files (e.g., `competitions.html`).
- **Folder Naming**: Organize by domain and feature (e.g., `competitions/teams/`).
- **Future-proofing**: Place reusable code in `components/`, scripts in `script/`, and styles in `style/`.

## Integration Points
- **Static Assets**: Place images in `images/` and reference them with relative paths.
- **Scripts/Styles**: Link JS/CSS via `<script>` and `<link>` tags in HTML. Use the dedicated folders.

## Example Patterns
- To add a new page for a feature:
  - Create a new HTML file in the relevant domain folder.
  - Link it from `index.html` or other navigation points.
- To add a new component:
  - Place reusable HTML/JS/CSS in `components/` and import/include as needed.

## Recommendations for AI Agents
- Maintain domain-based organization when adding new features.
- Prefer modularization: keep scripts, styles, and components in their respective folders.
- Update navigation in `index.html` when adding new pages.
- Use relative paths for all asset references.

---
For questions about conventions or missing context, ask the user for clarification before making structural changes.