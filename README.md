# pi-anthropic-computer-use

[![ci](https://github.com/code-yeongyu/pi-anthropic-computer-use/actions/workflows/ci.yml/badge.svg)](https://github.com/code-yeongyu/pi-anthropic-computer-use/actions/workflows/ci.yml) [![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Anthropic native computer-use extension for the [pi coding agent](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent).

This package is the standalone extraction of senpi's former builtin `anthropic-computer-use` extension.

## Behavior

When `PI_ANTHROPIC_COMPUTER_USE` is enabled, dimensions are valid, and API is `anthropic-messages`, the extension:

1. Registers a function tool named `computer` with a 16-action executor:
   - `screenshot`, `key`, `type`, `mouse_move`
   - `left_click`, `right_click`, `middle_click`, `double_click`, `triple_click`
   - `left_click_drag`, `cursor_position`, `left_mouse_down`, `left_mouse_up`
   - `scroll`, `hold_key`, `wait`
2. Rewrites outgoing Anthropic payloads to ensure native `computer_20250124` is present.
3. Strips function-shape `computer` entries when they are not native `computer_*` tool types.
4. Injects beta requirements in request payload:
   - header: `anthropic-beta: computer-use-2025-01-24`
   - extra body: `betas: ["computer-use-2025-01-24"]`
5. Appends a system-prompt section informing the model about display dimensions and computer tool usage.

## Environment Variables

- `PI_ANTHROPIC_COMPUTER_USE` — opt-in switch (`1`, `true`, `yes`, `on`)
- `PI_ANTHROPIC_COMPUTER_USE_WIDTH` — required positive integer when enabled
- `PI_ANTHROPIC_COMPUTER_USE_HEIGHT` — required positive integer when enabled
- `PI_ANTHROPIC_COMPUTER_USE_DISPLAY_NUMBER` — optional positive integer (X11 multi-display)

If width/height are missing or invalid while enabled, the extension disables itself for that session and logs an error.

## Platform Support and Dependencies

- macOS: supported via `screencapture`, `osascript`, and `cliclick`
- Linux: supported via `scrot` and `xdotool`
- Windows: unsupported (actions fail with a clear message)

Install dependencies:

- macOS: `brew install cliclick`
- Linux: install `xdotool` and `scrot` via your distro package manager

## Installation

```bash
# From npm (once published)
pi install npm:pi-anthropic-computer-use

# From git
pi install git:github.com/code-yeongyu/pi-anthropic-computer-use

# Manual placement
git clone https://github.com/code-yeongyu/pi-anthropic-computer-use ~/.pi/agent/extensions/pi-anthropic-computer-use
cd ~/.pi/agent/extensions/pi-anthropic-computer-use && npm install

# Dev / one-shot test
pi -e /path/to/pi-anthropic-computer-use/src/index.ts
```

## Development

```bash
npm install
npm test
npm run typecheck
npm run check
```

## Origin

Ported from `packages/coding-agent/src/core/extensions/builtin/anthropic-computer-use/index.ts` in `code-yeongyu/senpi-mono`.

## License

[MIT](LICENSE).

## Related

- [senpi](https://github.com/code-yeongyu/senpi) — the fork/runtime these extensions are extracted from.
- [Ultraworkers Discord](https://discord.gg/PUwSMR9XNk) — community link from the senpi README.
- [Dori](https://sisyphuslabs.ai) — the product powered by senpi under the hood.
