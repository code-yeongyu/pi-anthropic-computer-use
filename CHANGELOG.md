# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1] - 2026-09-24

### Changed

- Migrate from `@mariozechner/pi-*` scope to `@earendil-works/pi-*` scope.
- Refresh devDependencies: @biomejs/biome 2.5.14, vitest 5.0.1, @types/node 26.6.2, @typescript/native-preview 7.0.0-dev.20260707.2.
- Add GitHub Actions CI workflow on Bun 1.4.2 (test matrix: ubuntu-latest + macos-latest × node 22, 24).
- Update engines.node to >=22.19.0.
- Update installation docs to recommend Bun over npm.

### Fixed

- Skip native `computer_20250124` payload injection, beta wiring, and native-computer prompt text for Claude Opus 4.7 model ids, which Anthropic rejects for computer-use requests.

## [0.1.0] - 2026-05-07

### Added

- Initial release. Native Anthropic computer-use extension for the pi coding agent. Registers `computer` with 16 actions, injects native `computer_20250124`, and applies the `computer-use-2025-01-24` beta wiring when `PI_ANTHROPIC_COMPUTER_USE` is enabled with valid display dimensions.
