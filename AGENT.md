# AGENT.md

This file defines repository-wide common rules for AI coding agents.

---

## Scope and Priority

Use rules in this order:

1. Directory-specific AGENT.md (frontend/, docs/, backend/) when present
2. Instructions under .github/instructions/\* and .github/copilot-instructions.md
3. This root AGENT.md

When rules conflict, prefer the rule with narrower scope.

---

## Repository Baseline

- Monorepo: frontend (Vue/Vite), backend (Rust/Tauri), docs (Nuxt)
- Package manager: pnpm only
- Keep this repository template-generic; do not add product-specific logic
- .env is the source of truth for app metadata/version; do not manually desync version fields

---

## Downstream App Specification (Fill This Section)

This repository is a template. When it is used for a concrete app, fill in this section first.

### App Profile

- App name:
- Domain/business context:
- Target users:
- Supported platforms: (Windows/macOS/Linux)
- Release constraints: (offline support, enterprise policy, etc.)

### Core Features

- Feature 1:
- Feature 2:
- Feature 3:

### Functional Requirements

- FR-1:
- FR-2:
- FR-3:

### Non-Functional Requirements

- Performance:
- Security:
- Accessibility:
- Localization:
- Observability/logging:

### Out of Scope

- Explicitly excluded items:

### Project-Specific Decisions

- Naming/domain terms:
- API/command naming conventions:
- Storage and data retention policy:
- Error handling policy:

Rule: Before implementing app-specific features, check this section and align implementation decisions with it.

---

## Documentation Comment Rule (Mandatory)

For all generated code, documentation comments in English are mandatory.

### TypeScript / JavaScript

Add JSDoc-compliant comments for generated:

- functions (including exported arrow functions)
- constants
- classes

Use tags when applicable:

- @param
- @returns
- @throws
- @example

### Rust

Add Rustdoc comments for generated:

- functions
- constants
- types (struct, enum, trait)

Use sections when applicable:

- # Arguments
- # Returns
- # Errors
- # Panics
- # Examples

This applies to newly created symbols and symbols modified during refactoring.

---

## Directory Guides

- frontend/: frontend/AGENT.md
- docs/: docs/AGENT.md
- backend/: backend/AGENT.md
