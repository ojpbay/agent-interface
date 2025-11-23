# research.md — Document Chat SPA (Phase 0)

## Decisions to make

1. Browser-side Parquet parsing library
2. Angular 20 + NgRx signals integration details
3. Minimal testing stack

---

## Decision 1 — Parquet parsing in the browser

Decision: Use `parquetjs-lite` as the first attempt for browser parsing, with a fallback mocked-parquet-extractor for the prototype.

Rationale:
- `parquetjs-lite` is a lightweight JS implementation that can parse parquet files and has been used in browser builds (may require small polyfills). It minimizes additional infra while enabling a real demonstration when it works.
- If `parquetjs-lite` requires heavy polyfills or cannot parse in the selected browser environment, fallback is to: accept `.parquet` but display a friendly "Parsed preview unavailable in browser — showing placeholder" message and present a mocked pretty JSON generated from sample data. This keeps the prototype focused and avoids adding a server.

Alternatives considered:
- `@loaders.gl/parquet`: more robust parsing using loaders.gl ecosystem, but adds size and complexity.
- Server-side parsing: safest and most robust; rejected to keep scope frontend-only for the prototype.

Action items:
- Attempt to install `parquetjs-lite` during scaffold. If bundling or runtime issues arise, use the mocked extractor and include a TODO in code to replace with server-side parsing or a wasm-based parser later.

---

## Decision 2 — NgRx Signals & state shape

Decision: Use `@ngrx/signals` for global reactive state. Implement two top-level stores: `documentsStore` and `chatStore` with simple typed models.

Rationale:
- Signals provide a modern reactive pattern compatible with Angular 20 and avoid verbose NgRx boilerplate for a small prototype.

Store responsibilities:
- `documentsStore`: hold uploaded Document objects and provide functions to add/remove/list documents.
- `chatStore`: hold chat sessions keyed by documentId and provide functions to append messages and retrieve session history.

---

## Decision 3 — Testing and tooling

Decision: Use Angular's default TestBed with Karma/Jasmine for component/unit tests; configure ESLint + Prettier for code quality. Jest is optional and can be considered if team prefers it later.

Rationale: Defaults minimize initial setup friction with Angular CLI.

---

## Conclusion

- Proceed with `parquetjs-lite` attempt but include a robust fallback mocked parser to guarantee the demo works in all environments.
- Use NgRx signals stores for state and Angular Material for UI controls.
