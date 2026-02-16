
# 🎯 Your Goal

Design a **modern luxury, asymmetrical, typography-dominant digital menu**
for a gourmet pizzeria/hamburger restaurant in **Corso Italia, Catania**.

Dark mode.
Black/white base.
Muted gold accent.
One-off venue.
QR-focused (mobile-first).

---

# 🧠 Core Design Direction (Locked)

**Modern luxury, not classical.**

Think:

* Fashion brand energy
* Architectural spacing
* Strong serif headlines
* Minimal UI
* Controlled asymmetry
* Gold used sparingly

NOT:

* Delivery app style
* Rustic Italian
* Overdecorated
* Gradient-heavy
* Card-heavy

Luxury = restraint + spacing + hierarchy.

---

# 🧬 Design System (What You Set Up in Figma)

## Colors

* #0A0A0A → Primary background
* #121212 → Surface
* #F2F2F2 → Primary text
* #9A9A9A → Secondary text
* #C9A24D → Accent gold

Gold only for:

* Prices
* Divider lines
* Active nav underline

---

## Typography

Display Serif → Playfair Display
Body Sans → Inter

Text scale (semantic, not device-based):

* Display / XL → 72
* Display / L → 48
* Heading / L → 40
* Heading / M → 32
* Body / L → 20
* Body / M → 15
* UI / S → 13 uppercase

No duplicate desktop/mobile styles.
Use semantic scaling.

---

## Spacing

Use only:

8
16
24
32
48
64
80
120

Section spacing: 120
Category spacing: 80
Item spacing: 32

Luxury comes from consistent rhythm.

---

# 🛠 Tools Discussion (What We Decided)

## Figma AI

* Requires paid plan.
* Good for scaffolding.
* Not necessary.
* Cannot design luxury on its own.

## Tokens Plugin

* Works, but overkill for one restaurant.
* Needs manual “Create styles” step.
* Not magic.

## Best Alternative: Relume

Why?

* AI sitemap + wireframes
* Prompt-based
* Exports to Figma
* Structured layout blocks
* Better than random AI design tools

We created 3 structured prompts for:

1. Sitemap
2. Homepage
3. Menu page

Relume = scaffold
Figma = refinement
You = art director

---

# 🧱 Layout Structure We Defined

## Hero

* Left aligned
* Big serif headline
* Small uppercase tagline
* Thin gold divider
* No giant background image

---

## Category Navigation

* Minimal horizontal nav
* Uppercase small
* Active = gold underline
* No pills
* No heavy UI

---

## Menu Section

Category title (serif)
Gold line under it

Items:

* Name left
* Description below
* Price right (gold)
* Prices perfectly aligned

Optional featured item block with image and bigger typography.

No heavy cards.
No grid of food images.

---

# ⚠️ Key Philosophical Point

AI generates structure.
You enforce discipline.

Premium UI is:

70% spacing
20% typography
10% everything else

Models are good at the 10%.
You must control the 70%.

---

# 🔁 Correct Workflow Summary

1. Define visual system (you did).
2. Use Relume to scaffold wireframes.
3. Export to Figma.
4. Replace all default styles with your system.
5. Remove decorative noise.
6. Tune spacing in browser.
7. Implement in Next.js using tokens.

---

# 💡 What You Should Be Doing Right Now

If you haven’t yet:

* Generate homepage + menu page in Relume.
* Export to Figma.
* Start refining only mobile.
* Do NOT design 10 pages.
* Perfect 1 hero + 1 category block first.

---

# 🧠 Most Important Lesson From This Whole Process

The best model doesn’t design luxury.

Constraint + discipline does.

AI helps speed.
It does not create taste.

---

If you want, next we can:

* Review your Relume output and refine it
* Or I can sketch the exact asymmetrical layout proportions
* Or we move to translating this into clean Next.js components

Your move.
