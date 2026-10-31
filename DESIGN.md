# Design

Dial: ENERGY 2 / RHYTHM 3 / MOTION 2

Design Read: personal portfolio for recruiters, researchers and collaborators, in a "research notebook" style: a clean white page with a few handwritten teal annotations, a taped polaroid and real event photos.

## Visual theme

Professional, with a personal layer. The page reads like a well-kept notebook: clear typography and structure, plus a small number of hand-drawn touches that feel like Hajara's own notes. This is the design the owner preferred over every other direction tried.

## Color

| Role | Value | Reason |
|---|---|---|
| Paper | `oklch(0.995 0.001 250)` | The owner wants white, not beige |
| Paper 2 | `oklch(0.975 0.003 250)` | Research band |
| Ink | `oklch(0.19 0.012 265)` | Text, Moments and Contact bands |
| Muted | `oklch(0.5 0.012 265)` | Secondary text |
| Accent, ocean blue | `oklch(0.56 0.16 245)`, text shade `oklch(0.48 0.15 250)` | Chosen after teal, indigo and rose were rejected |
| Washes | sky blue `oklch(0.9 0.07 235)` and lilac `oklch(0.91 0.06 295)` | Radial gradients in every section, strong enough to be visible; they separate the sections |

## Typography

- Bricolage Grotesque for headings (the owner's favourite, softer than boxy grotesks).
- Geist for body text.
- Caveat only for the handwritten notes.
- Geist Mono only for small dates and labels in the quick-facts card.
- No uppercase tracked labels and no outlined numbers.

## Identity motif

Handwritten teal notes and hand-drawn marks: "hi, I'm", the underline under "researcher at heart", the arrow and caption on the polaroid, "quick facts", "my favourite part", "on my desk right now" and "say hi!".

## Motion

- Purpose: one entrance on load (name, intro, polaroid), gentle fade-ins as sections enter, real numbers counting up once, and small lifts on hover for the boxed elements.
- Owner override (R-19): the topic strip and the Moments photo strip keep a slow auto-scroll, paused on hover and off for reduced motion.
- Removed as decorative: the spinning star, rotating award stamps, the pulsing current-role ring, the bouncing scroll cue, the word-by-word heading reveal and the cursor spotlight.

## Owner decisions on record

- White background, no graph-paper grid, no "hs" monogram.
- Research list shows number, venue, title, summary and authors only; no results column, stamps, categories or filters.
- Moderate type sizes; the very large display type of a later experiment was rejected.
- Sections are separated by alternating bands (white, light grey, dark), not by rules. No boxed stat cells, no rules around research or the topic strip, no rules in the education list.
- Boxes (Education, Skills, Experience, contact form) have a 3px ink line on the left and bottom only, with rounded corners (0.9rem); no drop shadows.
- Experience: heading on the left with a short summary on the right; a full-width panel of rows (logo, role, company, skills, dates, View certificate) with a teal timeline line and dots down its left side.
- Certificates open in a smaller viewer over a light, blurred backdrop so the page stays visible.
- Black line icons sit on the right of the Achievements heading and the Education and Toolkit box titles.
- Research order: papers with a link first ("Check out paper"), then presented work, whose button ("See the award") jumps to and opens the matching achievement.
- Research titles are plain text; each paper has a "Check out paper" button on the right, as on the original site.
- Moments photos have rounded corners.
- No decorative star glyphs before honours.
- Icons beside titles are solid black (filled), not outlines.
- Hero line: "AI Engineer · AI/ML Researcher · Published Researcher".
- Experience: "2+ years of experience" beside the heading; one box with a date column, a timeline line and dots, logo, role, skills and a View certificate text link.
- Skills (not "Toolkit") are plain bulleted text, not tag pills. Box titles are larger, with larger solid black icons.
- "Check out paper" is a text link with an underline and arrow, not a button.
- Contact and footer are light like the rest of the page; only Moments stays dark.
- Experience rows: Elchai Group (Mar 2026 to Present) with its logo, no Current role tag; View certificate is a plain link with an arrow, no underline. Achievements heading uses a solid black medal icon.
