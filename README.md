# AAC Support at RUSD (business card landing site)

Small public site that the business card QR code points to. Separate from the RUSD AAC Hub on purpose: nothing here links to the Hub, and nothing needs a password.

## Setup

1. Create a new public repo named `aac-support` under the same GitHub account used for the Hub, and turn on GitHub Pages (Settings > Pages > Deploy from branch > main, root).
2. Copy `index.html`, `go/index.html`, and this README into it.
3. The site will live at `https://jbutanda.github.io/aac-support/` and the redirect at `https://jbutanda.github.io/aac-support/go/`.

## The QR code

Generate the QR against the redirect address, not the page itself:

    https://jbutanda.github.io/aac-support/go/

Any free static QR generator works for this. Because the QR points at `go/`, you can change its destination later by editing the URL inside `go/index.html` and pushing. The printed cards never need to change.

## What is on the page

Four sections, all public, nothing behind a password: the three app quick-guide QR sheets (hosted in the rusd_aac_staff repo), free printable core boards from AssistiveWare, Tobii Dynavox, PRC-Saltillo, and Project Core, four best-practice links, and contact (email plus the existing Staff AAC Question Form).

Nothing on this page links to the RUSD AAC Hub. Add that later when the Hub is ready.

## Before printing

- Scan the finished QR on a phone using district Wi-Fi, home Wi-Fi, and cellular before you approve the print proof.
- Open every tile once from a phone. The Tobii Dynavox boards sit behind a sign-up form on their site; the page says so.

## Try an AAC Device (talker/)

Interactive 60-word core board with three modes (Free talk, Challenge, Watch me model), English and Spanish, and a voice picker. Lives at:

    https://jbutanda.github.io/aac-support/talker/

Deep links open a mode directly: `talker/#free`, `talker/#challenge`, `talker/#model`.

To put it on the Google Site: Insert > Embed > By URL, paste the address above, then drag the embed box tall enough to show the whole board (about 900 px on desktop).

Symbols are OpenMoji (CC BY-SA 4.0); the credit line is in the page footer and in `talker/CREDITS.md`. Keep both if the page is copied or changed.

## Myth or Fact? (myth-or-fact/)

Twelve flip cards (9 myths, 3 facts) about AAC, English and Spanish, with a guess-and-flip game, score, "Read it to me" audio, a "Try this" tip, a research citation on each card, and a button that opens the matching Try an AAC Device mode. Lives at:

    https://jbutanda.github.io/aac-support/myth-or-fact/

Embed in Google Sites the same way as the AAC device page (Insert > Embed > By URL); about 700 px tall on desktop.

## VOICE Check (voice-check/)

Five-step daily device check for teachers and paras (Visible, On, In reach, Charged, Every setting), English and Spanish, with a one-line fix for every "not yet." About 650 px tall when embedded.

    https://jbutanda.github.io/aac-support/voice-check/

## What Would You Do? (what-would-you-do/)

Twelve real-life scenarios (classroom staff, families, behavior team, a transition-age student in the community), three choices each with coaching on every choice and a research note. Filters by audience. English and Spanish. About 1000 px tall when embedded.

    https://jbutanda.github.io/aac-support/what-would-you-do/

## Modeling Bingo (modeling-bingo/)

Family bingo card: 24 home routines, each paired with one core word and a modeling tip, plus a free square. Tap a square for the tip, stamp it when you model it, five in a row is bingo. New card, clear and print buttons; stamps are saved in the browser. English and Spanish. About 900 px tall when embedded.

    https://jbutanda.github.io/aac-support/modeling-bingo/

## The demo AAC device (shared/device.js)

Try an AAC Device (`talker/`), Walk in Their Shoes, Find It Fast and AAC Buddy all use the same robust demo device: the 60 core words on the home page, a row of folder keys (Little words, Questions, People, Feelings, Food, Places, Activities, Actions, Time, Describe, Chat) and an ABC keyboard for spelling. Folder words live in `shared/vocab.js` (about 190 words, English and Spanish). The `talker/` folder name is kept so existing links keep working.

## Prototype tools (shared foundation)

These nine load `shared/core.js` and `shared/base.css`, so the board words, voices, colors and symbols stay consistent. Each lives at `https://jbutanda.github.io/aac-support/<folder>/`.

| Folder | For | What it does |
| --- | --- | --- |
| `find-it-fast/` | Staff | Timed 10-word hunt on the full device: core words plus folder words, with folder hints; best time saved |
| `walk-in-their-shoes/` | Staff trainings | Partner answers questions using only the AAC device against a 60-second timer, then a debrief |
| `pd-path/` | Staff | Five stops, a six-question check, printable certificate; set `FORM_URL` to log completions |
| `modeling-tracker/` | Staff | "I modeled!" counter with a daily goal ring, quick word chips, week bars; data stays in the browser |
| `core-word-of-the-week/` | Families, staff | Auto-rotating weekly word with home and school ideas and a printable poster; set `START` to the school calendar |
| `all-about-me/` | Families, teams | One-page student communication profile that prints; nothing is saved |
| `aac-buddy/` | Classmates | Six read-aloud pages, a three-question check and a printable buddy badge |
| `calm-boards/` | Students | Tap-to-talk regulation boards for TK-2, 3-5 and 6-12, with Spanish -o/-a endings |
| `core-board-maker/` | SLPs, teachers | Printable 12/24/36/60-word core boards in English, Spanish or both |
| `program-at-a-glance/` | Admin | Program dashboard; shows sample numbers until `SHEET_CSV_URL` points to a published Google Sheet |

## Second set of tools (November 2026)

Ten more, on the same shared foundation, all English and Spanish.

| Folder | For | What it does |
| --- | --- | --- |
| `start-here/` | Everyone | Front door: three questions point people to the right tools, plus a "My Tools" shelf and every tool with audience filters |
| `help-desk/` | Families, staff | Pick the problem (no sound, stuck, frozen, words moved, battery, voice, broken, won't use it) and try one fix at a time; makes a note for the team if it's still stuck |
| `talk-at-home/` | Families | Ten home routines, four words each with a phrase and tip; prints as a fridge card |
| `model-it/` | Staff, families | Ten real moments; build a model on the full device and get three quick checks (length, fit, function) plus team ideas |
| `wait-for-it/` | Staff, families | Ask a question, then see if you wait long enough for the student to answer; results chart against the 5 to 10 second zone |
| `more-than-requesting/` | Staff, admin | Sort 18 AAC messages into six communication functions |
| `escape-room/` | PD | Team game: six locks opened by talking on the device, timer, hints, printable certificate |
| `core-games/` | Classrooms | Smartboard games (Bubbles, Race Car, Silly Monster) driven by six big core keys; full-screen button |
| `awareness-challenge/` | District | October word calendar with stamps and badges, plus a school leaderboard; sample data until `SHEET_CSV_URL` is set |

### Featured tools strip (for embedding)

`featured/` shows a row of tool cards made to be embedded on another page, like the Google Site home page. It reads `shared/catalog.js`, so names, colors and icons always match Start Here. Pick the tools with `?tools=talker,model-it,wait-for-it,myth-or-fact` (that set is the default) and Spanish with `?lang=es`. Four across on a computer, two by two on tablets and phones, about 320 px tall. Cards open each tool in a new tab.

### Save to My Tools

Every tool now has a star button in its header (`shared/bookmark.js`, reading the list in `shared/catalog.js`). Saved tools appear on Start Here. They are kept in the visitor's browser only. When the tools are embedded in Google Sites, saves made on that site stay together. When you add a new tool, add one line for it to `shared/catalog.js`.

### Header pictures (shared/art)

Illustrations made with Gemini, cleaned up and sized for the web. Nine tools show one in the header: add `has-hero` to the band and an `img.hero` after `.top` (see any of those pages). The landing page uses `home-banner.jpg`. Full-size copies, a print flyer and alt text live outside the repo. Each tool keeps its alt text in English and Spanish on the image's `data-en` and `data-es`.
