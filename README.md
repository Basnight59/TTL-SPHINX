
# TTL-SPHINX Governance Layer

**Transcendental Technologies of Liberation (TTL)**

This application is a React-based interface for the S.P.H.I.N.X. (Scrutinize, Probe, Hypothesize, Investigate, Narrow, Execute) AI Governance Protocol. It provides a "faith-aware" governance layer that allows users to route AI queries through specific ethical or religious frameworks (Islamic, Jewish, Christian, Secular Humanist) before execution.

## Features

-   **Multi-Framework Support**: Select from pre-configured ethical frameworks (Islamic, Jewish, Christian, Secular).
-   **S.P.H.I.N.X. Protocol Engine**: Visualizes the 6-step governance process in real-time.
-   **Sacred Consent (Human-in-the-Loop)**: A mandatory "Investigate" step that pauses execution for human authorization based on the selected framework's specific ethical criteria.
-   **Immutable Audit Log**: A cryptographically chained ledger of all system events, user actions, and agent decisions.
-   **HOB Artifact Generation**: Produces a "Handoff Oversight Block" (YAML) upon completion, serving as a portable proof of governance.

## Tech Stack

-   **Frontend**: React 19, TypeScript
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React
-   **AI Integration**: Google Gemini API via `@google/genai` SDK

## Quick Start

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Set your API Key (see Setup Guide).
4.  Run the application: `npm start` (or `vite` depending on your bundler).

## Audit Trail System

The system includes a live "Immutable Audit Ledger" at the bottom of the interface. This log uses a hash-chaining mechanism where the hash of every new entry is derived from the `(Previous Hash + Timestamp + Actor + Action)`. This ensures that the sequence of events cannot be tampered with without invalidating the chain.

## License

MIT License.
