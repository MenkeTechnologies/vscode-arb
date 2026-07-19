# Changelog

All notable changes to the `vscode-arb` extension are documented here.

## [0.1.0]

- Initial release.
- Filetype detection for `*.arb` and arb shebangs.
- TextMate grammar (`source.arb`): comments, single/double strings, regex and
  duration/size literals, numbers, constants, input sources, widgets, query
  verbs, actions, directives, keywords, dotted widget paths, `-flags`, and
  pipe/bind/lambda operators.
- Language-server integration via `arb --lsp`.
- Debugging via `arb --dap` (breakpoints, stepping, variables).
- Run the active file with `arb <file>` (Ctrl+F5).
