# Design

Dial: ENERGY 2 / RHYTHM 3 / MOTION 2

Design Read: personal portfolio for recruiters, researchers and collaborators, in a confident but restrained portfolio style with handwritten teal notes as the identity motif.

## Visual theme

Confident and personal. Real photos and clear structure carry the energy; decoration stays out of the way. Professional first, with one human gesture: short handwritten notes in teal, as if Hajara had annotated the page by hand.

## Color

| Role | Value | Reason |
|---|---|---|
| Background | `oklch(0.995 0.001 250)` near-white | The owner asked for white, not beige or cream |
| Surface | `oklch(0.975 0.003 250)` | Separates the research and achievements bands without a new color |
| Ink | `oklch(0.19 0.012 265)` | Primary text and the dark bands (Moments, Contact) |
| Muted text | `oklch(0.5 0.012 265)` | Secondary copy and metadata |
| Hairline | `oklch(0.91 0.004 250)` | Row dividers |
| Accent, sea teal | `oklch(0.62 0.11 190)`, text shade `oklch(0.5 0.095 192)` | Chosen by the owner; used only for the handwritten notes, the current-role marker, link underlines and the primary number |

No gradients, no glows, no glass.

## Typography

- **Bricolage Grotesque** for headings: soft, slightly rounded and characterful. The owner preferred it over boxier grotesks (Schibsted Grotesk was rejected).
- **Geist** for body text: neutral and very readable at small sizes, so the headings carry the personality.
- **Caveat** only for the handwritten notes (the identity motif), never for content.
- Sizes stay moderate (the owner found very large display type too much): name up to about 5.75rem, section titles up to 3rem.
- No uppercase tracked labels, no outlined numbers (the owner rejected them), no monospace aesthetic.

## Layout

- Wide: content up to 90rem with fluid gutters, because the owner asked for a wider page.
- Every section opens with the same header: title, optional one-line intro, and a dark rule underneath, so sections are clearly separated. Sections alternate white and light grey bands, with the two dark bands (Moments, Contact) as anchors.
- Inside the header, each section has its own composition (RHYTHM 3): split hero with a large photo, a full-width statement for About, a big-title list for Research, a "now" feature plus a three-column row for Experience, an edge-to-edge photo strip for Moments, year-grouped accordions for Achievements and a full dark band for Contact.
- Radius is small and consistent: 0.5rem on controls, 0.75rem on photos.

## Components

- Buttons: one filled ink button for the primary action, text links elsewhere. Only the primary button carries an arrow.
- Research rows: number, venue line above the title, title as the link, summary, authors. No results column, stamps or category labels (owner request).
- Experience: the current role as a large statement; past roles as equal columns with logo, dates, duration and skills.
- Achievements: accordion rows with organiser logos and inline photos.

## Motion

- Purpose: guide the eye down a long page and give the first screen one clear entrance.
- Page load: the name and photo reveal once.
- Scroll: sections fade and rise 20px once as they enter; real numbers count up once.
- Hover: color and underline changes, small image zoom on photos.
- Owner override (R-19): the topic strip and the Moments photo strip keep a slow auto-scroll, paused on hover and disabled for reduced motion. The owner chose to keep them when asked.
- All motion is disabled under `prefers-reduced-motion`.

## Identity motif

Handwritten teal notes: "hi, I'm" above the name, a caption under the portrait, and one note in Contact. Three uses, no more.
