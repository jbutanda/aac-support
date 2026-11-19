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

## Try a Talker (talker/)

Interactive 60-word core board with three modes (Free talk, Challenge, Watch me model), English and Spanish, and a voice picker. Lives at:

    https://jbutanda.github.io/aac-support/talker/

Deep links open a mode directly: `talker/#free`, `talker/#challenge`, `talker/#model`.

To put it on the Google Site: Insert > Embed > By URL, paste the address above, then drag the embed box tall enough to show the whole board (about 900 px on desktop).

Symbols are OpenMoji (CC BY-SA 4.0); the credit line is in the page footer and in `talker/CREDITS.md`. Keep both if the page is copied or changed.
