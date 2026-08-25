# Czeno — Quality Intelligence [Your Company/System Name]

A client-side interactive demo of an intelligent QMS layer for heat sink
manufacturing (extrusion, fin assembly/bonding, plating, final QA). Every
"AI" behavior — classification, similarity search, drift detection,
propagation scoring — runs as real, deterministic computation in the
browser. Nothing calls an external LLM or embedding API, and no data leaves
the session.

## Features

- **Intelligent CAPA Triage** — intake a new NCR, get AI-suggested category /
  severity / assignee with a human accept-edit-reject flow, and a
  Similarity Snapshot of the 3 most similar historical events (real TF-IDF
  cosine similarity, not scripted).
- **Semantic Search** — hybrid keyword + vector search across all indexed
  NCRs/CAPAs/audit findings, with an adjustable keyword↔semantic weight
  slider and follow-up refinement.
- **Golden Batch Optimization** — per-line parameter monitoring against
  statistically derived Golden Windows (mean ± 3σ), live drift/z-score
  detection, and "why" factors computed from the actual seeded event history.
- **Predictive CAPA Propagation** — when a CAPA closes, scans other product
  lines for shared supplier/material/category signals and scores
  recurrence probability; one click converts a candidate into a new
  Preventive Action.
- **RCA Data Quality Dashboard** — completion rate by line against an 80%
  target, and a nudge workflow for NCRs open more than 7 days without an RCA.
- **Audit Trail** — every AI suggestion and every accept/edit/reject
  decision made against it, logged immutably.

The seed data (`src/services/data/seedData.ts`) tells one coherent thread on
purpose: a residual-stress problem in Supplier A aluminum billets surfaces
as a Flatness defect on Line A, closes as a CAPA, and the same
supplier/material relationship is what Propagation and Golden Batch drift
detection pick up elsewhere — so you can see the five features connect to
one root cause while clicking through the demo.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # type-checks then builds to dist/
npm run test       # runs the vitest unit suite
npm run lint
```

Requires Node 18+.

## Architecture

```
src/
├── types/            Shared TypeScript types (events, audit, propagation)
├── services/
│   ├── ai/            TF-IDF engine, heuristic classifier, similarity, propagator
│   └── data/           Seed data, constants, date/PRNG utilities
├── stores/            Zustand stores (events, audit log, active tab, propagation state)
├── hooks/             useEvents / useSearch / useTriage / usePropagation, generic hooks
├── components/
│   ├── ui/             Presentational atoms (Badge, Card, Button, ConfidenceStamp, ...)
│   ├── layout/          Sidebar, Header, MainLayout
│   ├── sections/        One folder per feature, each with an orchestrator + sub-components
│   └── animations/      framer-motion wrappers (AnimatedCard, PageTransition, ...)
├── config/            Navigation, chart color, and app-name config
└── utils/             Date/formatting/validation helpers, animation presets
```

State flows one way: `stores` hold raw data → `hooks` derive TF-IDF corpora
and feature-specific logic from the stores → `sections` render that state
and call back into the hooks. No component reaches into a store it doesn't
own directly; everything goes through a hook.

## Path to production

This repo is intentionally infrastructure-free so it runs anywhere with
just `npm install`. Swapping in real infrastructure is a matter of
replacing the implementations behind the same interfaces:

| Demo (this repo)                          | Production                                              |
| ----------------------------------------- | ------------------------------------------------------- |
| `services/ai/tfidf.ts` cosine similarity  | OpenAI/Voyage embeddings + PostgreSQL `pgvector`        |
| `services/ai/classifier.ts` keyword rules | Structured-output call to an LLM (GPT-4o-mini / Claude) |
| Zustand stores, in-memory                 | REST/GraphQL API backed by PostgreSQL + Redis + BullMQ  |
| No auth                                   | JWT + refresh tokens, OAuth2                            |
| `services/data/seedData.ts`               | CSV/Excel ingestion + live ERP/MES/LIMS connector       |

`services/ai/classifier.ts` and `services/ai/similarity.ts` are the two
files to replace first — their function signatures
(`classifyCategory(text) => { category, confidence }`,
`findSimilarEvents(events, ..., text, topN) => SimilarityMatch[]`) are
designed to stay the same whether the implementation behind them is a
keyword heuristic or a real model call, so the UI layer doesn't need to change.

## Testing

`tests/unit` holds real, passing unit tests for the TF-IDF engine, the
heuristic classifier, and formatting utilities (via Vitest + jsdom).
`tests/integration` and `tests/e2e` are scaffolded and empty — wire up
Testing Library / Playwright there as the project grows.
