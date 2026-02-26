# Jarv1s

**A portable, private AI agent that lives on your machines — not in the cloud.**

Jarv1s is a personal AI assistant designed around three principles: **run locally**, **remember meaningfully**, and **move with you**. Your agent's identity, memory, and configuration travel as a single encrypted bundle between your devices — no central server, no cloud dependency, no telemetry.

## Why Jarv1s

Most AI assistants are stateless chat interfaces. They don't remember. They can't act. They live on someone else's server.

Jarv1s is different:

- **Persistent memory** — Conversations become knowledge. Patterns become automations. Jarv1s learns what matters to you.
- **Local execution** — Runs on your hardware using local LLMs (Ollama, llama.cpp). Your data never leaves your machines.
- **Portable identity** — Export your entire agent as a single `.jcore` file. Copy it to a USB drive. Load it on another machine. Same Jarv1s.
- **Actual agency** — Shell commands, file operations, browser automation, IoT control, scheduled tasks. Jarv1s does things, not just talks about them.
- **Device sync without cloud** — Encrypted peer-to-peer sync between your devices over LAN or direct connection. You control the infrastructure.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     JARV1S CORE                         │
├──────────────┬──────────────┬──────────────────────────┤
│  Cognition   │   Memory     │      Identity Layer       │
│  Engine      │   Engine     │      (Portable Core)      │
├──────────────┴──────────────┴──────────────────────────┤
│                   Context Bus (local IPC)               │
├───────────┬───────────┬──────────────┬─────────────────┤
│  Tool     │  Device   │  Automation  │   Sync          │
│  Runtime  │  Monitor  │  Engine      │   Engine        │
├───────────┴───────────┴──────────────┴─────────────────┤
│              Transport Layer (mDNS / P2P / USB)         │
└─────────────────────────────────────────────────────────┘
```

### Core Modules

| Module | Purpose |
|--------|---------|
| **Identity Layer** | Agent persona, cryptographic keys, preferences — the "soul" that persists across devices |
| **Memory Engine** | Three-tier memory: working (session), episodic/semantic (long-term), procedural (learned workflows) |
| **Cognition Engine** | LLM abstraction layer supporting Ollama, llama.cpp, with OpenAI/Anthropic fallback |
| **Tool Runtime** | Sandboxed execution of shell, filesystem, browser, calendar, search, and custom tools |
| **Automation Engine** | Trigger-condition-action system for proactive behaviors |
| **Sync Engine** | CRDT-based encrypted peer-to-peer sync without central servers |

## Features

### Memory That Matters

Jarv1s doesn't just log conversations — it extracts facts, detects patterns, and builds procedural knowledge:

- **Episodic memory** — What happened (events, conversations)
- **Semantic memory** — What was learned (facts, relationships, patterns)
- **Procedural memory** — How to do things (workflows, macros, automations)
- **Memory compression** — Old conversations summarized, important knowledge retained

### Tool Execution

Jarv1s can act on your behalf with permission-gated access:

- Shell commands (sandboxed, configurable allowlists)
- Filesystem operations (scoped read/write paths)
- Browser automation (Playwright-based)
- System monitoring (processes, network, resources)
- IoT integration (MQTT, Home Assistant)
- Custom tools via plugin system

### Proactive Automation

Define triggers that make Jarv1s work without being asked:

- Time-based (cron-style scheduling)
- Event-based (file changes, system events)
- Webhook-based (GitHub, CI/CD, custom integrations)
- Voice-activated (local wake word detection)

Jarv1s also learns patterns: *"I noticed you check GitHub issues every morning. Want me to summarize new ones automatically?"*

### Portable Identity

Your agent's entire state exports as a single encrypted `.jcore` bundle:

```
jarvis-core/
├── identity/           # Persona, keys, fingerprint
├── memory/             # All memory tiers
├── config/             # Permissions, automations, preferences
└── manifest.json       # Version, checksum, sync metadata
```

Copy it to any machine. Load it. Same Jarv1s.

### Private Sync

Sync between your devices without cloud infrastructure:

- **mDNS discovery** — Automatic detection on local network
- **P2P sync** — Direct encrypted connection between devices
- **USB sync** — Air-gap option for maximum security
- **Optional relay** — Self-hosted relay for cross-network sync (your server, your control)

All sync is end-to-end encrypted with keys you control.

## Interfaces

- **CLI** — Primary interface with rich terminal UI
- **TUI** — Full terminal dashboard
- **Voice** — Local wake word + speech-to-text (faster-whisper) + TTS (Piper)
- **Web** — Optional local web interface
- **API** — REST/WebSocket for custom integrations

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | Python 3.11+ |
| LLM Runtime | Ollama, llama.cpp |
| Vector Store | ChromaDB (local) |
| Database | SQLite |
| CLI | Typer + Rich |
| TUI | Textual |
| Voice STT | faster-whisper |
| Voice TTS | Piper |
| Automation | APScheduler + watchdog |
| IoT | MQTT (paho) + Home Assistant API |
| Crypto | PyNaCl (libsodium) |
| Config | Pydantic + YAML |

## Quick Start

```bash
# Clone the repository
git clone <your-jarv1s-repo-url>
cd jarv1s

# Install dependencies
pip install -e .

# Initialize Jarv1s
jarvis init

# Start the agent
jarvis run
```

## Configuration

Permissions and behavior are defined in YAML:

```yaml
# config/permissions.yaml
tools:
  shell:
    allowed_commands: ["ls", "git", "npm", "python"]
    blocked_paths: ["/etc", "/sys"]
    require_confirm: ["rm", "sudo"]

  filesystem:
    read: ["~/Documents", "~/Projects"]
    write: ["~/Documents/jarvis-output"]
    blocked: ["~/.ssh", "~/.gnupg"]
```

## Roadmap

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Core identity, SQLite memory, Ollama integration, CLI, basic tools | In Progress |
| 2 | Vector memory, episodic→semantic compression, context retrieval | Planned |
| 3 | Full tool suite, automation engine, IoT bridge, voice interface | Planned |
| 4 | Portable `.jcore` bundle, P2P sync, mDNS discovery | Planned |
| 5 | Plugin API, web UI, single-binary packaging | Planned |

## Design Philosophy

**On cognition:** Don't reinvent reasoning — use local LLMs as the brain and build scaffolding (memory injection, tool routing, plan execution) around them. This is what separates an agent from a chatbot.

**On memory:** Semantic similarity isn't enough. Long-term, Jarv1s will use a local knowledge graph to reason about *relationships* between things you've told it, not just find similar text.

**On portability:** The `.jcore` encrypted bundle is the core UX primitive. Your entire agent fits in one file you can copy to a USB drive. Everything else — mDNS sync, P2P — is convenience on top of that guarantee.

**On privacy:** No telemetry. No analytics. No cloud. The install script should be auditable in 5 minutes. That trust is the entire value proposition.

## Requirements

- Python 3.11+
- [Ollama](https://ollama.ai/) (for local LLM execution)
- 8GB+ RAM recommended for local model inference

## License

MIT
