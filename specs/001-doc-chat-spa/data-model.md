# data-model.md — Document Chat SPA

## Entities

### Document
- id: string (UUID)
- filename: string
- uploadedAt: string (ISO timestamp)
- rawContent: string (original file content or serialized JSON)
- contentType: string (e.g., "application/parquet")

Validation rules:
- `filename` required
- `rawContent` optional for empty files

### ChatSession
- id: string (UUID)
- documentId: string (Document.id)
- messages: Message[]

### Message
- id: string (UUID)
- sessionId: string (ChatSession.id)
- role: "user" | "assistant"
- text: string
- timestamp: string (ISO)

## State

- `documentsStore`: { documents: Document[] }
- `chatStore`: { sessions: Record<documentId, ChatSession> }

## Notes

- For prototype, all IDs and timestamps may be generated client-side. No persistence is required — state lives in NgRx signals stores.
