# Design System Strategy: High-Performance Athleticism

## 1. Overview & Creative North Star: "The Kinetic Monolith"
This design system is built to mirror the intensity of a high-performance training facility. Our Creative North Star is **"The Kinetic Monolith."** It represents a visual language that is heavy, immovable, and grounded, yet electrified by surges of raw energy. 

To move beyond the "generic fitness app" look, we abandon traditional grid-bound layouts for **Intentional Asymmetry**. We use large-scale typography to anchor the eye, while high-contrast accents create a sense of urgency and motion. The UI should feel like a piece of precision gym equipment: weighted, premium, and tactical.

## 2. Color & Tonal Depth
We do not use color to "decorate." We use it to signal state and power.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. All separation must be achieved through background shifts.
- Use `surface-container-low` (#131313) for the base page background.
- Use `surface-container` (#1a1a1a) or `surface-container-high` (#20201f) for cards and grouped content.
- This creates a seamless, "molded" look rather than a boxy, partitioned one.

### Surface Hierarchy & Nesting
Treat the interface as a series of stacked, machined plates.
- **Base Level:** `surface` (#0e0e0e).
- **Secondary Level:** `surface-container-low` (#131313) for recessed utility areas.
- **Action Level:** `surface-container-highest` (#262626) for interactive cards.

### Signature Textures & The "Neon Glow"
To provide visual "soul," primary action buttons should not be flat. Use a subtle linear gradient from `primary_fixed` (#cafd00) to `primary_dim` (#beee00). For high-priority metrics (like a New PR), apply a `0px 0px 20px` blur using the `primary` color at 30% opacity to create a "biological glow" effect.

## 3. Typography: The Editorial Punch
We use **Inter** as our foundational typeface, but we treat it with editorial aggression.

- **Display & Headline:** Use `Extra Bold` weights with tight letter-spacing (-0.02em). These are the "heavy weights" of the UI. Use `display-lg` (3.5rem) for workout titles to create a high-fashion, high-performance aesthetic.
- **Title & Body:** Switch to `Medium` or `Regular` weights. Use `on_surface_variant` (#adaaaa) for secondary body text to ensure the primary metrics (in `on_surface` White) pop.
- **The Metric Rule:** Any numerical data (Reps, Weight, Time) should always be one step higher in the hierarchy than its label. If the label is `label-md`, the data must be `title-md`.

## 4. Elevation & Depth: Tonal Layering
Traditional shadows look "dusty" in dark mode. We use light, not shadow, to define depth.

- **The Layering Principle:** Achieve lift by nesting colors. Place a `surface-container-highest` card atop a `surface-dim` background. The contrast in value provides all the necessary separation.
- **Ambient Shadows:** For floating Modals or Trays, use a massive 40px blur with the shadow color set to a 10% opacity version of `primary` (#f3ffca). This makes the element feel like it is emitting light rather than casting a dark shadow.
- **The "Ghost Border" Fallback:** If a divider is functionally required, use `outline_variant` at **10% opacity**. It should be felt, not seen.
- **Glassmorphism:** For top navigation bars or sticky headers, use `surface_container` at 80% opacity with a `20px` backdrop-blur. This keeps the user grounded in their workout context as they scroll.

## 5. Components & Primitive Styling

### Buttons: The Power Units
- **Primary:** Gradient fill (`primary_fixed` to `primary_dim`), Black text (`on_primary_fixed`), `8px` corner radius. 
- **Secondary:** Surface-container-highest fill with a `Ghost Border`.
- **Destructive:** `error_dim` (#d53d18) background with `on_error` (#450900) text. No gradients here—destruction should feel flat and final.

### Input Fields: Quick-Entry Tactical
- **Styling:** No visible "box" on four sides. Use a `surface-container-highest` background with a thick 2px bottom-bar in `outline`. On focus, the bottom-bar transforms into `primary` (#f3ffca) with a subtle outer glow.
- **Typography:** Input text should use `title-lg` for readability during high-heart-rate moments.

### Cards & Progress
- **Forbid Dividers:** Use `8` (2rem) or `10` (2.5rem) from the Spacing Scale to separate card sections. 
- **Charts:** Use `primary` for the data line. Fill the area beneath the line with a gradient transitioning from `primary` (20% opacity) to transparent.

### Data Chips
- Use `full` (9999px) roundedness. 
- Background: `secondary_container` (#474746).
- Text: `on_secondary_container` (#d2d0cf).

## 6. Do’s and Don'ts

### Do:
- **Use "Agitated" Whites:** Use `secondary` (#e5e2e1) for large text blocks to reduce eye strain, reserving pure White (#FFFFFF) for headers.
- **Embrace Negative Space:** Use the `24` (6rem) spacing token for top-level padding to give the "Titan" aesthetic room to breathe.
- **Tactile Feedback:** Use `primary_container` for active toggle states to make the UI feel responsive.

### Don’t:
- **No 100% Opaque Borders:** Never use a solid grey line to separate workout sets. Use a background shift to `surface-container-low`.
- **No Small Tap Targets:** In a workout context, the minimum tap target is 48px. Use the `12` (3rem) spacing scale for button heights.
- **No Centered Headers:** Keep typography left-aligned or use intentional asymmetry (e.g., massive right-aligned metrics) to maintain the premium editorial feel.