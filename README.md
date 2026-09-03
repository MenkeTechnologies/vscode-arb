```
██╗   ██╗███████╗ ██████╗ ██████╗ ██████╗ ███████╗     █████╗ ██████╗ ██████╗
██║   ██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝    ██╔══██╗██╔══██╗██╔══██╗
██║   ██║███████╗██║     ██║   ██║██║  ██║█████╗█████╗███████║██████╔╝██████╔╝
╚██╗ ██╔╝╚════██║██║     ██║   ██║██║  ██║██╔══╝╚════╝██╔══██║██╔══██╗██╔══██╗
 ╚████╔╝ ███████║╚██████╗╚██████╔╝██████╔╝███████╗    ██║  ██║██║  ██║██████╔╝
  ╚═══╝  ╚══════╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝
```

[![CI](https://github.com/MenkeTechnologies/vscode-arb/actions/workflows/ci.yml/badge.svg)](https://github.com/MenkeTechnologies/vscode-arb/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docs](https://img.shields.io/badge/docs-online-brightgreen.svg)](https://menketechnologies.github.io/vscode-arb/)

VS Code / VSCodium language support for **arb** — the pipe-native language that
turns a Unix pipeline into a live TUI or served web page from a declarative,
Tcl/Tk-flavored spec. arb is a `jq`/`xpath`/`css`/`yq` superset that runs on the
`fusevm` bytecode VM + Cranelift JIT.

## Features

- **Filetype detection** for `*.arb` files and `#!` arb shebangs.
- **Syntax highlighting** via a standalone TextMate grammar (`source.arb`):
  widgets (`text`, `table`, `gauge`, `bars`, …), query verbs (`field`, `where`,
  `tally`, `group_by`, …), input sources (`in.json`, `in.csv`, `in.logfmt`, …),
  directives (`source`, `bind`, `grid`), regex and duration/size literals
  (`/re/i`, `500ms`, `4mb`), dotted widget paths (`.codes`), and `-flags`.
- **Language server** via `arb --lsp` — diagnostics, hover, completion.
- **Debugging** via `arb --dap` — breakpoints, stepping, variables.
- **Run** the active file with `arb <file>` (Ctrl+F5 or the editor-title play
  button).

## Requirements

The `arb` binary must be on `PATH`, or set `arb.path` to its absolute location:

```sh
brew install menketechnologies/menketech/arb
```

## Extension Settings

| Setting | Default | Description |
| --- | --- | --- |
| `arb.path` | `arb` | Path to the arb executable. |
| `arb.lsp.enabled` | `true` | Start the arb language server (`arb --lsp`). |
| `arb.lsp.args` | `["--lsp"]` | Arguments used to launch the language server. |

## Links

- Language: <https://github.com/MenkeTechnologies/arb>
- Docs: <https://menketechnologies.github.io/vscode-arb/>
- Issues: <https://github.com/MenkeTechnologies/vscode-arb/issues>

## License

MIT.
