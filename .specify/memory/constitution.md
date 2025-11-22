<!--
Sync Impact Report

- Version change: TEMPLATE -> 1.0.0
- Modified principles:
	- [PRINCIPLE_1_NAME] -> Purpose & Scope
	- [PRINCIPLE_2_NAME] -> Minimum Viable Prototype (MVP) Rules
	- [PRINCIPLE_3_NAME] -> Tech Stack & Dependencies
	- [PRINCIPLE_4_NAME] -> UX, Accessibility & Performance
	- [PRINCIPLE_5_NAME] -> Testing, Quality & Observability
- Added sections:
	- Constraints & Security (mapped from SECTION_2)
	- Development Workflow (mapped from SECTION_3)
- Removed sections: none
- Templates requiring manual review:
	- `.specify/templates/plan-template.md` : ⚠ pending (verify "Constitution Check" gate alignment)
	- `.specify/templates/spec-template.md` : ⚠ pending (ensure user-story test requirements align)
	- `.specify/templates/tasks-template.md`: ⚠ pending (verify phase/task guidance matches MVP constraints)
	- `.specify/templates/checklist-template.md`: ⚠ pending
	- `.specify/templates/agent-file-template.md`: ⚠ pending
- Follow-ups / TODOs:
	- None. RATIFICATION_DATE set to adoption date. If project prefers a different ratification date, update the header and Last Amended date accordingly.
-->

# agent-interface Constitution

## Core Principles

### Purpose & Scope
This constitution defines the minimum governance needed to produce a modern single-page application (SPA) prototype. It applies to feature work, plans, and tasks that are scoped as part of prototype development for the `agent-interface` project. The constitution is intentionally lightweight and focused on enabling rapid, testable prototypes that can be iterated into production later.

### Minimum Viable Prototype (MVP) Rules
- The project MUST prioritize delivering independently testable user journeys (P1 first). Work that does not directly advance a P1 user story MUST be deprioritized for prototypes.
- Prototype code MAY use pragmatic shortcuts (mocked data, simplified auth, feature flags) but these shortcuts MUST be explicitly documented in the related spec/plan and marked `prototype-only`.
- Production hardening (scaling, full security audits, long-term persistence) is out-of-scope for MVP unless explicitly required by stakeholders.

### Tech Stack & Dependencies
- DEFAULT stack for SPA prototypes: Vite + React + TypeScript. This is a recommended starting point but MAY be replaced by another modern stack if justified in a plan and approved in a PR.
- Dependency rules: prefer zero-config, fast DX tools. Pin direct dependencies in `package.json` and use a lockfile. Add only what is necessary for the MVP.
- Node and toolchain versions MUST be declared (`engines` in `package.json` or equivalent) and documented in the project README for reproducible local setups.

### UX, Accessibility & Performance
- Prototypes MUST be usable and responsive on desktop and mobile viewports. Basic accessibility MUST be considered: semantic HTML, keyboard navigation, and ARIA where appropriate.
- Performance: measure load time and avoid large, unnecessary assets. For prototypes, prefer lazy-loading and code-splitting for obvious heavy assets.

### Testing, Quality & Observability
- At minimum, each prioritized user story MUST include one acceptance test (manual or automated) and a small set of unit or component tests for critical logic.
- Linting and formatting (e.g., ESLint + Prettier) SHOULD be enabled and configured with project defaults. Pull requests MUST pass lint checks before merge.
- Telemetry and logging for prototypes is OPTIONAL; if telemetry is added, it MUST avoid collecting PII and comply with legal/privacy constraints.

## Constraints & Security
Sensitive secrets MUST never be committed. Use environment variables, secret managers, or dev-only `.env` patterns excluded from VCS. Authentication for prototypes can be mocked, but production secrets or API keys must be replaced with safe test credentials.

Cross-origin rules, CORS and allowed origins MUST be documented for any backend the SPA talks to. Any external service used in the prototype MUST be evaluated for data handling risks and noted in the plan.

## Development Workflow
- Branching: feature branches SHOULD use `feature/<short-description>` or `fix/<short-description>` naming. Create one PR per focused change.
- PR requirements: at least one reviewer (two reviewers encouraged for non-trivial changes), passing CI (lint + tests for changed code), and a clear description linking to the plan/spec.
- Releases & Versioning: prototypes use semantic versioning for the constitution and project artifacts. Constitution versioning rules:
	- MAJOR: incompatible governance or principle removals/renames
	- MINOR: new principle/section added
	- PATCH: clarifications and wording fixes

## Governance
Amendments to this constitution MUST be proposed via pull request to the `main` branch and include: rationale, migration notes (if applicable), and proposed version bump. Amendments require approval by at least one project maintainer and one additional reviewer. The author of the PR MUST select the version bump level (MAJOR/MINOR/PATCH) with justification; maintainers will confirm during review.

Compliance: PRs for code must reference the relevant plan/spec and include a short note about constitution compliance (e.g., "Conforms to: Minimum Viable Prototype, Tech Stack & Dependencies").

**Version**: 1.0.0 | **Ratified**: 2025-11-22 | **Last Amended**: 2025-11-22

