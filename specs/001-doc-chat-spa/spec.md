# Feature Specification: Document Chat SPA

**Feature Branch**: `001-doc-chat-spa`  
**Created**: 2025-11-22  
**Status**: Draft  
**Input**: User description: "Build a SPA web application with a chat interface to allow users to upload a document and then ask questions of the document content via chat. The application should have a chat assistant via a sidebar that is accessible from all pages. There should be a homepage with a description of the application; an uploaded documents index page that shows all previously uploaded documents; and a document page where the user can view the content of the uploaded document initially in JSON but with pretty formatting. Prototype: minimum needed to prove flows; persistence and external APIs not required at this stage."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Upload & Chat (Priority: P1)

As a user I can upload a document and then ask questions about its contents in a chat UI so I can get answers derived from the document.

**Why this priority**: This is the primary value of the prototype — proving the end-to-end flow (upload → chat) with a document.

**Independent Test**: Upload a sample JSON/TXT/PDF (mocked), open the chat for that document, ask a question, and receive a mocked answer referencing the document content.

**Acceptance Scenarios**:

1. **Given** the user is on the Documents Index, **When** they upload a document, **Then** the document appears in the list with a timestamp and filename.
2. **Given** a document exists, **When** the user opens the Document page and opens the chat assistant, **Then** they can send a question and receive a response (mocked) that references the document content.
3. **Given** the user navigates to any page, **When** they open the sidebar assistant, **Then** the assistant is visible and usable without losing the current page state.

---

### User Story 2 - Documents Index (Priority: P2)

As a user I can see a list of previously uploaded documents with basic metadata so I can choose which to inspect or chat about.

**Independent Test**: Visit the Documents Index page and verify the list renders mocked document entries; click an entry navigates to the Document page.

**Acceptance Scenarios**:

1. **Given** there are uploaded documents (mocked), **When** the user visits the Documents Index, **Then** the UI shows filename, uploaded date, and brief status for each item.

---

### User Story 3 - Document View (Priority: P3)

As a user I can open a Document page to view the uploaded file rendered as pretty JSON and access the page-level chat assistant to ask questions about that document.

**Independent Test**: Open a document page and verify the raw JSON is replaced with a pretty-printed viewer; confirm chat pane can be opened and used.

**Acceptance Scenarios**:

1. **Given** a document is selected, **When** the user opens the Document page, **Then** the content is displayed as formatted JSON (if JSON-like) or a simple text preview otherwise.

---

### Edge Cases

- Uploading an unsupported file type: show a friendly error and accept only sample types for prototype.
- Very large files: show an upload-size warning; for prototype reject files > 2MB with a clear message.
- Empty document: show "No content" and disable chat for that document.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Users MUST be able to upload a document from the Documents Index page (upload widget) and see it appear in the list.
- **FR-002**: Users MUST be able to open a Document page to view the document content in a pretty-printed JSON viewer or text preview.
- **FR-003**: The application MUST provide a chat assistant sidebar accessible from all pages that accepts user questions and returns mocked responses derived from the opened document.
- **FR-004**: Documents Index MUST display filename, upload timestamp, and a link/button to open the Document page.
- **FR-005**: Navigation between Home, Documents Index, and Document page MUST preserve UI state (e.g., which document is open) during a single session (in-memory only).

**Non-functional (prototype-level)**

- **NFR-001**: No persistence required — mock data in memory is acceptable for prototype.
- **NFR-002**: Ensure basic accessibility: keyboard navigation and semantic markup for core flows.
- **NFR-003**: The app SHOULD run locally with `npm/yarn` and start a dev server using Vite.

### Key Entities *(include if feature involves data)*

- **Document**: { id, filename, uploadedAt, rawContent (string), contentType }
- **ChatSession**: { id, documentId, messages[] }
- **Message**: { id, sessionId, role (user|assistant), text, timestamp }

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can upload and view a document and open a chat for that document in under 2 minutes from a fresh repo/dev-server start using the provided README instructions.
- **SC-002**: The sidebar assistant is visible and functional from Home, Documents Index, and Document pages (verified in 100% of manual tests for primary flows).
- **SC-003**: Documents Index renders at least 5 mocked documents without layout breakage on desktop and mobile viewports.
- **SC-004**: The Document page displays pretty-printed JSON for JSON-like content and retains the same document state while interacting with the chat assistant.

## Assumptions

- Persistence is intentionally omitted for the prototype; data is kept in memory and lost on refresh unless the developer explicitly adds localStorage.
- Chat responses are mocked/simulated (no external LLM/API calls required for the MVP). Test responses will reference document snippets to demonstrate relevance.
- File types supported for prototype: `.json`, `.txt`. PDF/text extraction is out-of-scope for the minimal prototype unless the user requests.

## Implementation Notes (non-normative)

- Preferred stack: Vite + React + TypeScript (aligns with constitution). Use React Router for navigation, a small component for sidebar state, and a simple in-memory store (React context) to hold uploaded documents and chat sessions.
- Keep UI minimal: a top navigation bar, left content area, and a right collapsible sidebar for the assistant.
- Provide simple mock service that extracts a few sentences from the document for chat responses.

---

**End of Spec**

