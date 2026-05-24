---
name: Neon Lab Adventure
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#859398'
  outline-variant: '#3c494e'
  surface-tint: '#3cd7ff'
  primary: '#a8e8ff'
  on-primary: '#003642'
  primary-container: '#00d4ff'
  on-primary-container: '#00586b'
  inverse-primary: '#00677e'
  secondary: '#d7ffc5'
  on-secondary: '#053900'
  secondary-container: '#2ff801'
  on-secondary-container: '#0f6d00'
  tertiary: '#f6d3ff'
  on-tertiary: '#520072'
  tertiary-container: '#e9adff'
  on-tertiary-container: '#8200b3'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b4ebff'
  primary-fixed-dim: '#3cd7ff'
  on-primary-fixed: '#001f27'
  on-primary-fixed-variant: '#004e5f'
  secondary-fixed: '#79ff5b'
  secondary-fixed-dim: '#2ae500'
  on-secondary-fixed: '#022100'
  on-secondary-fixed-variant: '#095300'
  tertiary-fixed: '#f8d8ff'
  tertiary-fixed-dim: '#ebb2ff'
  on-tertiary-fixed: '#320047'
  on-tertiary-fixed-variant: '#74009f'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-md:
    fontFamily: BeVietnamPro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: BeVietnamPro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-tech:
    fontFamily: SpaceGrotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-margin: 24px
  gutter: 16px
---

## Brand & Style
The design system is a high-energy, futuristic framework tailored for Grade 8–9 students learning Chemistry. It leverages a **Futuristic Glassmorphism** style mixed with **Cyber-Vibrant** accents to transform academic concepts into an immersive "Neon Lab" experience. 

The visual language communicates that science is not static but an active, glowing exploration. The UI should feel like a high-tech laboratory interface from the future—responsive, luminous, and tactile. By using high-contrast neon elements against a deep slate void, we ensure that educational content (atomic structures, chemical equations) becomes the focal point of the adventure. The tone is adventurous, encouraging students to "experiment" rather than just "study."

## Colors
This design system utilizes a "Deep Space" palette to maximize the vibrance of its neon components.

*   **Dark Slate (#0F172A):** The foundation. Used for the background to create a sense of depth and focus.
*   **Electric Blue (#00D4FF):** The primary navigational color. Used for interactive UI elements, links, and general "Tech" interfaces.
*   **Neon Green / Atomic (#39FF14):** Represents growth, success, and atomic energy. Used for progress bars, "correct" states, and active bonds.
*   **Glowing Purple / Molecular (#BC13FE):** Represents complexity and chemistry. Used for rare elements, special challenges, and molecular structures.

**Semantic States:**
*   **Success:** Neon Green.
*   **Warning/Heat:** Bright Orange (#FF8C00).
*   **Error/Reactive:** Electric Crimson (#FF0055).

## Typography
The typography system balances technical precision with modern friendliness. 

*   **Sora** is used for major headings and titles to provide a bold, futuristic "tech-inspired" look. It should be used sparingly for maximum impact.
*   **BeVietnamPro** handles the bulk of the educational content. It is optimized for the Vietnamese language, ensuring diacritics are legible even during fast-paced gameplay.
*   **SpaceGrotesk** is reserved for labels, button text, and technical readouts (like atomic numbers or mass), giving the UI a "computer-terminal" aesthetic.

Titles should often use a subtle outer glow (text-shadow) matching their primary category color (e.g., Blue or Green) to reinforce the neon theme.

## Layout & Spacing
The design system utilizes a **Fluid Grid** with centered content containers to maintain the "cockpit" feel of a laboratory terminal.

*   **Desktop:** 12-column grid with a maximum container width of 1280px.
*   **Tablet/Mobile:** 4-column grid with increased side margins (24px) to prevent thumbs from covering critical chemical data.

Spacing follows a 4px base unit. UI elements should feel "airy" with generous internal padding (16px–24px) to account for the visual weight of the glassmorphic blurs and glow effects. Use "safe zones" around chemical icons to ensure they don't overlap with navigation buttons during animated transitions.

## Elevation & Depth
Depth in this design system is achieved through **Glassmorphism** and **Luminosity** rather than traditional shadows.

1.  **Background Layer:** Dark Slate with a subtle grid pattern or distant "molecular" particles.
2.  **Base Panels:** Semi-transparent surfaces (20-40% opacity) with a high `backdrop-filter: blur(12px)`.
3.  **Borders:** Use a 1px solid or gradient stroke with high saturation (e.g., Electric Blue) to define the edge of the glass.
4.  **Floating Elements:** Elements like chemical elements or floating tooltips use an `outer-glow` (bloom effect) instead of a black shadow. The glow color must match the element's atomic category.
5.  **Active State:** When a component is interacted with, its glow intensity increases, and its border thickness may grow to 2px.

## Shapes
The primary shape language is **Hexagonal** and **Angled**.

*   **Hexagons:** The signature shape for the design system. Used for main action buttons, element icons, and periodic table modules.
*   **Angled Corners:** Rectangular panels should have "clipped" corners (chamfered) rather than standard rounded corners to reinforce the futuristic lab aesthetic.
*   **Progress Bars:** Use a "segmented" pill shape to represent energy cells or chemical saturation levels.

Avoid perfectly round circles unless representing subatomic particles (electrons/protons) to maintain the contrast between "nature" (round) and "technology" (angled/hexagonal).

## Components

**Buttons (Hexagonal):**
Primary buttons are hexagonal with a solid neon border and a subtle glass fill. Hover states trigger a full neon fill with a high-intensity bloom effect. Text is uppercase SpaceGrotesk.

**Glassmorphism Panels:**
Used for quest descriptions and inventory. Features a thin 1px blue stroke, blurred background, and a "scanline" overlay effect at 5% opacity to add texture.

**Progress Bars (Energy/Reaction):**
Represented as a series of glowing vertical segments. As the bar fills, it transitions from Purple (low energy) to Electric Blue, and finally Neon Green (reaction complete).

**Chemical Element Icons:**
Displayed inside a hexagonal frame. The symbol (e.g., "H", "O") uses Sora Bold, while the atomic number uses SpaceGrotesk. The frame color changes based on the element type (Alkali metals, Noble gases, etc.).

**Input Fields:**
Dark slate background with a bottom-only neon stroke. When focused, the stroke pulses and a small hexagonal "active" indicator appears at the end of the field.

**Lists & Inventory:**
Items are arranged in a honeycomb (hexagonal) layout rather than a standard square grid to maximize the "molecular" theme.