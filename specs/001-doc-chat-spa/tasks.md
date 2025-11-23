---
description: "Task list (detailed) for Document Chat SPA prototype"
---

# Tasks: Document Chat SPA

**Input**: `spec.md`, `plan.md`, `research.md`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize project scaffold and developer tooling

- [ ] T001 [P] Initialize Angular 20 project under `frontend/` using Angular CLI and commit scaffold files (`frontend/angular.json`, `frontend/src/`).
- [ ] T002 [P] Install dependencies in `frontend/package.json`: `@angular/material`, `@ngrx/signals`, `parquetjs-lite` (or placeholder), `@angular/router`, `eslint`, `prettier`.
- [ ] T003 [P] Add ESLint and Prettier configs and npm scripts in `frontend/package.json` (`lint`, `format`, `start`, `test`).
- [ ] T004 [P] Add `.gitignore` entries for `frontend/node_modules`, `dist/`, and any local env files.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core app shell, routing, and stores required before user stories

- [ ] T005 Create app shell and routing: `frontend/src/app/app.component.ts`, `TopNavComponent` in `frontend/src/app/components/top-nav/`, and `app-routing.module.ts`.
- [ ] T006 [P] Create core models and services in `frontend/src/app/core/`: `models/document.model.ts`, `services/document.service.ts`, `services/upload.service.ts`, `services/parquet-parser.service.ts` (mock-ready).
- [ ] T007 [P] Implement NgRx signals stores under `frontend/src/app/store/`: `documents.store.ts` and `chat.store.ts` with typed APIs to add/list documents and create/append chat messages.
- [ ] T008 [P] Add Angular Material theme and global styles in `frontend/src/styles.scss` and configure Material module imports at `frontend/src/app/material.module.ts`.

---

## Phase 3: User Story 1 - Upload & Chat (Priority: P1) 🎯 MVP

**Goal**: Allow upload of `.parquet` files and ask questions via a global assistant

**Independent Test**: Upload a sample `.parquet` (or mocked placeholder), open the chat assistant, send a question, and receive a mocked, document-relevant answer.

- [ ] T009 [US1] Create `DocumentsUploadComponent` in `frontend/src/app/pages/documents-upload/` with a `.parquet`-only file input and size validation (reject > 2MB).
- [ ] T010 [US1] Hook upload to `documentsStore`: parse file (via `parquet-parser.service` or mocked extractor) and add Document with `{id, filename, uploadedAt, rawContent, contentType}`.
- [ ] T011 [US1] Create `assistant.service.ts` in `frontend/src/app/core/services/` that returns mocked assistant responses referencing small snippets of the document; include a deterministic stub for tests.
- [ ] T012 [US1] Implement chat UI in `SidebarAssistantComponent` (`frontend/src/app/components/sidebar-assistant/`) that sends messages to `assistant.service` and stores messages in `chatStore`.
- [ ] T013 [US1] Add unit tests for upload flow and assistant stub (`frontend/src/app/pages/documents-upload/documents-upload.spec.ts`, `frontend/src/app/core/services/assistant.spec.ts`).

---

## Phase 4: User Story 2 - Documents Index (Priority: P2)

**Goal**: Show previously uploaded documents and navigate to a document view

**Independent Test**: Documents Index renders mocked documents and navigates to Document page on click.

- [ ] T014 [US2] Implement `DocumentsIndexComponent` in `frontend/src/app/pages/documents-index/` to list documents from `documentsStore` with filename and `uploadedAt`.
- [ ] T015 [US2] Add navigation links/buttons to open each Document in `DocumentViewComponent` (`/documents/:id`).
- [ ] T016 [US2] Add acceptance smoke test for Documents Index navigation (`frontend/src/app/pages/documents-index/documents-index.spec.ts`).

---

## Phase 5: User Story 3 - Document View (Priority: P3)

**Goal**: Pretty-print document content and enable page-level assistant

**Independent Test**: Document page displays pretty JSON and the assistant can be used for that document.

- [ ] T017 [US3] Implement `DocumentViewComponent` in `frontend/src/app/pages/document-view/` that fetches document by id and renders metadata.
- [ ] T018 [US3] Create `PrettyJsonViewerComponent` in `frontend/src/app/components/pretty-json-viewer/` and use it in `DocumentViewComponent` to show `rawContent` as pretty JSON or text preview.
- [ ] T019 [US3] Ensure SidebarAssistant can be focused on the current document (default to documentId from route when on `/documents/:id`).
- [ ] T020 [US3] Add unit test for `PrettyJsonViewerComponent` to verify JSON formatting behavior.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T021 [P] Add sample `.parquet` files (or JSON placeholders) to `specs/001-doc-chat-spa/samples/` and update `quickstart.md` to reference them.
- [ ] T022 [P] Add accessibility checks and keyboard navigation support to core controls (TopNav, Upload, Assistant). Document findings in `specs/001-doc-chat-spa/`.
- [ ] T023 [P] Run lint and format across `frontend/` and fix issues.
- [ ] T024 [P] Add e2e or integration smoke test for primary flows (upload → view → chat) if time allows.
- [ ] T025 Prepare docs & PR: `frontend/README.md` + finalize `specs/001-doc-chat-spa/quickstart.md` and open PR with branch `001-doc-chat-spa`.

---

## Dependencies & Execution Order

- Setup (Phase 1) must complete before Foundational (Phase 2).
- Foundational (Phase 2) must complete before any user story work begins.
- User stories (Phases 3-5) may be worked on in parallel once Phase 2 is complete, but be mindful of file conflicts.

## Parallel Opportunities

- Tasks marked `[P]` are safe to run in parallel (different files, no blocking dependencies).
- DocumentsIndex and DocumentView pages (US2/US3) can be implemented concurrently after stores exist.

## Implementation Strategy

1. MVP: Complete Phase 1 + Phase 2 + T009-T012 (Upload + Assistant core) to have a working demo.
2. Incrementally add Documents Index and Document View (T014-T019), then polish.

## Notes

- All file paths referenced are relative to repository root. Use Angular CLI to generate components and modules to ensure consistent structure.
- Keep tasks small and focused; create follow-up tasks if implementation uncovers sub-tasks.
