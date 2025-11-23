# Document Chat SPA (Prototype)

This is a minimal Angular 20 prototype for the Document Chat SPA feature. It implements an in-memory upload flow, a documents index, a document view with pretty JSON, and a right-hand assistant that returns mocked responses referencing document content.

Quick start (PowerShell):

```powershell
cd frontend
npm install
npx ng serve --open
```

Notes:
- The prototype accepts `.parquet` file uploads but uses a mocked parser (`ParquetParserService`) that reads file text and returns a placeholder. Replace with `parquetjs-lite` or server-side parsing for real parquet support.
- Chat assistant is mocked by `AssistantService` and demonstrates the interface.
