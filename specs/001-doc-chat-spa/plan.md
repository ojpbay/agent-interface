
# Implementation Plan: Document Chat SPA

**Branch**: `001-doc-chat-spa` | **Date**: 2025-11-22 | **Spec**: `spec.md`
**Input**: Feature specification from `/specs/001-doc-chat-spa/spec.md`

## Summary

Create a minimal SPA prototype that lets users upload `.parquet` files, view a pretty JSON representation of the document, and ask questions about the document via a chat assistant that is available from a right-hand sidebar across pages. Prototype uses Angular v20, NgRx Signal stores for state, and Angular Material for UI controls. No persistence or external LLM/API calls required — chat responses will be mocked to demonstrate the flow.

## Technical Context

**Language/Version**: TypeScript (>=5), Angular 20
**Primary Dependencies**: `@angular/core@20`, `@angular/router`, `@ngrx/signals`, `@angular/material`, `parquetjs-lite` (or browser-friendly parquet parser - see research.md), `prettier`, `eslint` (Angular ESLint)
**Storage**: In-memory (NgRx Signals) — optional localStorage if desirable for demo
**Testing**: Angular TestBed with Karma/Jasmine (default) or Jest (optional)
**Target Platform**: Web browsers (desktop + mobile responsive)
**Project Type**: Web application (single frontend project)
**Performance Goals**: Minimal — responsive UI; reject uploads > 2MB for prototype
**Constraints**: Uploads restricted to `.parquet`; no server-side parsing or persistence for MVP; must use Angular Material components and NgRx signals stores
**Scale/Scope**: Prototype-level — single-developer implementation, limited to core flows

## Constitution Check

GATE: Constitution allows replacing the default stack (Vite+React+TS) if justified and approved in a PR. Rationale:

- User explicitly requested Angular v20, NgRx Signals and Angular Material. This plan documents that decision, provides implementation notes, and preserves the lightweight prototype constraints defined in the constitution (MVP-focused, mock data allowed, explicit documentation of prototype-only shortcuts).

Gate result: PASS (stack change justified by user request and documented). When merging, include a short note in PR description referencing the constitution and why Angular was chosen.

## Project Structure

``text
frontend/                    # Angular app (ng project)
├── src/
│   ├── app/
│   │   ├── core/            # services, models, mock backends
│   │   ├── components/      # shared components (Nav, SidebarAssistant)
│   │   ├── pages/           # Home, DocumentsIndex, DocumentView
│   │   ├── store/           # NgRx signals stores
│   │   └── app-routing.module.ts
│   └── assets/
└── angular.json

specs/001-doc-chat-spa/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── openapi.yaml
``

**Structure Decision**: Single Angular project (`frontend/`) keeps the prototype minimal and matches the user's request. No backend project included.

## Phase 0: Research

Tasks:
- Decide parquet parsing strategy for browser: evaluate `parquetjs-lite`, `@loaders.gl/parquet`, or fallback to mock parsing.
- Confirm browser bundle size and polyfills required by chosen parquet library.
- Confirm NgRx signals usage pattern and package names for Angular 20.

Output: `research.md` (Phase 0) — completed alongside this plan with decisions and rationale.

## Phase 1: Design & Contracts

Prerequisites: `research.md` complete

1. Generate `data-model.md` describing `Document`, `ChatSession`, `Message` (done)
2. Generate `contracts/openapi.yaml` that describes hypothetical client endpoints (upload, list, get document, chat) to inform UI flows (done)
3. Create `quickstart.md` with local dev commands and prerequisites (done)
4. Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot` to update agent file with active technologies (Angular 20, NgRx, Material)

## Phase 2: Implementation (scaffold)

Purpose: Scaffold the minimal Angular app, wire up pages and components, and implement in-memory services and mocked chat logic.

Tasks (high-level):
- T1: Initialize Angular project under `frontend/` using Angular CLI v20.
- T2: Add Angular Material and set up Material theme and typography.
- T3: Implement NgRx signals stores for documents and chat sessions.
- T4: Add pages: `HomeComponent`, `DocumentsIndexComponent`, `DocumentViewComponent`.
- T5: Implement `SidebarAssistantComponent` available on all pages; add document selector in the assistant (defaults to last-selected document in session).
- T6: Implement upload widget (accept `.parquet` only) and in-memory upload handler. For prototype, parser will use `parquetjs-lite` when available; otherwise use a mocked extractor that returns sample JSON.
- T7: Add pretty JSON viewer component (uses `JSON.stringify(obj, null, 2)` + syntax highlighting)
- T8: Add unit tests for critical components and run linting/format.

## Phase 3: Polish & Deliverables

- Create README and demo instructions (`quickstart.md`).
- Basic accessibility checks and responsive QA.
- Package minimal demo artifacts and sample `.parquet` test files (if parsing supported).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Angular instead of React | User requirement; team preference for Angular features | React would have been faster to scaffold given prior constitution default, but user requirement takes precedence and is documented |
| Client-side Parquet parsing | Desired to keep prototype browser-only | Server-side parsing would simplify implementation and avoid browser polyfills, but increases infra scope outside prototype constraints |

## Acceptance

Proceed with Phase 0 research decisions and then implement Phase 2 scaffold if you approve the Angular stack and the browser-parquet approach described in `research.md`.
