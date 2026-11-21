# Sum up 21 November's world news in one image

[![make.fun](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121)
[![Rank](https://make.fun/badge/news-image-20261121/Alfani03/news-image-20261121/rank.svg)](https://make.fun/bounty/news-image-20261121)
[![Reward](https://make.fun/badge/news-image-20261121/Alfani03/news-image-20261121/reward.svg)](https://make.fun/bounty/news-image-20261121)

Entry for the make.fun bounty [Sum up 21 November's world news in one image](https://make.fun/bounty/news-image-20261121) — $100, 50 places paid,
deadline Monday 23 November 2026, 00:00 UTC (07:00 WIB).

## What it is

A clean newspaper-style infographic, 1024×1024 PNG, drawn programmatically
with PIL. It names the day — **Saturday, 21 November 2026** — and sums it up
in six stories:

1. **Ukraine / Poland (hero)** — Russia's heaviest barrage: 400+ drones,
   110 missiles; at least 8 killed in Kyiv; bridges, rail and power hit.
   Russian missiles also land in Poland; NATO calls it a grave violation.
2. **Markets** — AI sell-off: S&P 500 into correction; Nikkei down 5.1%.
3. **Climate, Antalya** — COP31 talks pass their deadline with no deal;
   the draft drops fossil fuels and the $120bn finance goal.
4. **Space** — BepiColombo reaches Mercury after an 8-year flight
   (ESA/JAXA, orbit entry on 21 November 2026).
5. **Health** — Daraxonrasib trial: tumours undetectable in 1 in 12
   pancreatic cancer patients.
6. **Gaza** — Strikes continue; Gaza health ministry reports 9 dead,
   55 injured arriving at hospitals.

Sources checked on 21 Nov 2026: BBC, AP, Reuters, ESA, One Turn.
All figures are as reported that day. No hype, no speculation shown as fact.

## How it works

`main.ts` (Node 22, standard library only) copies the image held in this
repository, `entry.png`, to `/output/entry.png` (or
`$MAKEFUN_OUTPUT_DIR/entry.png`). It makes no network requests and its
output is byte-identical on every run.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
# -> out/entry.png, 1024x1024 PNG, ~121 KB (limit: 1 MiB)
```

## Files

- `main.ts` — the entry program
- `entry.png` — the image
- `LICENSE` — MIT
- `README.md` — this file

Entrant: Alfani (@alfani03 on make.fun, GitHub Alfani03).
