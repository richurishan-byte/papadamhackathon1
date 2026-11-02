# A Better Tomorrow — Ethereal Web Platform

An ethereal, sacred digital sanctuary for planetary restoration, conscious living, and collective hope. Built with Tailwind CSS, Google Fonts (Playfair Display & Manrope), and Material Symbols, inspired by the design system in `DESIGN.md`.

---

## 🌟 Integrated Platform Overview

All four sections from your uploaded designs have been integrated into a responsive Single-Page & Multi-Page web platform:

1. **Home (`#home` / `home.html`)**:
   - **Hero Section**: "Together, We Can Create a *Better Tomorrow*."
   - **Live Celestial Pulse**: Real-time ticker tracking souls committed to dawn stewardship.
   - **Story Scenery**: "Where humanity remembers harmony with the earth."
   - **The Reality We Face**: Aquifer Regeneration Pact (68% restored), Canopy Protection (40% secured), and Ancient Saplings Target (98M / 100M).
   - **Explore Key Portals**: Direct portals to Waters, Clean Energy, and Indigenous Kinship.
   - **Interactive Micro-Action Radiance Slider**: Real-time calculations of annual CO₂ lift and clean water saved based on daily single-use replacements.

2. **Issues (`#issues` / `issues.html`)**:
   - **The Living Earth & Humanity**: 4 Sanctuary Realms across global causes.
   - **Category Filter**: Filter causes by *All Causes*, *Ancient Canopy*, *Pristine Waters*, *Clean Atmosphere*, and *Community Harmony*.
   - **Cause Cards**:
     - *Guardians of the Ancient Canopy* (82% milestone)
     - *Living Springs & Clean Horizons* (1,840 aquifer wells)
     - *Sunlit Energy & Pure Air* (540 clean grids)
     - *Human Dignity & Sacred Nourishment* (410 food cooperatives)
   - **Interactive Sacred Commitment Modal**: Pledge presets ($15, $35, $100) with confirmation toast notification.

3. **Impact (`#impact` / `impact.html`)**:
   - **Interactive Before & After Story Card**: "The Golden Valley Rebirth" with draggable comparison slider revealing the transformation from Arid Desolation (2018) to Thriving Oasis (Today).
   - **Interactive Sacred Geometry Impact Calculator**:
     - 3 dynamic sliders: Monthly Pledge ($10 - $250), Hours of Service (0 - 40 hrs), and Trees Sponsored (2 - 100).
     - Animated SVG circular gauge and live resonance score with dynamic tiers (*Seeker*, *Guardian*, *Luminary*, *Sanctuary Master*).
     - Real-time recalculation of purified CO₂, families provided water, and forest hectares preserved.
   - **Voices from the Canopy**: Live community stories from environmental keepers.

4. **Wall of Hope & Pledge (`#pledge` / `pledge.html`)**:
   - **Inscribe Dedication Form**: Live 280-character counter, sanctuary category selection, commitment tier cards (*Supporter*, *Guardian*, *Beacon*, *Vow of Action*), and golden shimmer submission button.
   - **Sacred Collective Resonance**: Live global counter tracking total inscribed pledges across 164 nations.
   - **Interactive Wall of Hope**:
     - Live community feed of pledges with location and glowing flame badges.
     - "Send Light" reaction buttons that toggle illumination, increment light counters, and persist state.
     - Newly inscribed pledges immediately prepend to the wall and persist locally and via API.

---

## 🚀 How to Run the Website on Localhost

### Option 1: Double-Click Launcher (Easiest)
Simply double-click **`run.bat`** (or **`start.bat`**). It will automatically:
1. Detect Node.js or fallback to PowerShell.
2. Launch the local web server on port **3000**.
3. Open your default web browser directly to `http://localhost:3000`.

### Option 2: Command Line (Node.js)
```bash
node server.js
```
Then open `http://localhost:3000` in your web browser.

### Option 3: PowerShell (Built-in Windows)
If you don't have Node.js in your system PATH:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```

---

## 🎨 Theme Modes
- **Dawn Sanctuary Mode** (Default): Warm Ivory canvas (`#FAF8F0`), champagne gold accents, morning mist opacity.
- **Twilight Sanctuary Mode**: Click the twilight icon (`wb_twilight`) in the top-right header to toggle an ethereal celestial night mood. Your choice persists across visits.

