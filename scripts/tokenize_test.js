// Tokenize an arb sample with the real VS Code grammar engine
// (vscode-textmate + vscode-oniguruma) and assert key scopes. Verifies the
// grammar actually loads under oniguruma and classifies tokens.
const fs = require('fs');
const path = require('path');
const vsctm = require('vscode-textmate');
const oniguruma = require('vscode-oniguruma');

const root = path.join(__dirname, '..');
const wasm = fs.readFileSync(path.join(root, 'node_modules/vscode-oniguruma/release/onig.wasm'));
const onigLib = oniguruma.loadWASM(wasm.buffer).then(() => ({
  createOnigScanner: (s) => new oniguruma.OnigScanner(s),
  createOnigString: (s) => new oniguruma.OnigString(s)
}));

const registry = new vsctm.Registry({
  onigLib,
  loadGrammar: () =>
    Promise.resolve(
      vsctm.parseRawGrammar(
        fs.readFileSync(path.join(root, 'syntaxes/arb.tmLanguage.json'), 'utf8'),
        'arb.tmLanguage.json'
      )
    )
});

const lines = [
  '#!/usr/bin/env arb',
  '# http status dashboard',
  'bars  .codes -label "status codes"',
  'gauge .errs -max 50',
  'source .codes { in.logfmt | field code | tally }',
  'source .e { in.logfmt | field code | match /^5/ | count }',
  'fn pct(v, m): v / m * 100',
  '.g <- load every 1s'
];

// (lineIndex, searchString, requiredScopeSubstring)
const checks = [
  [2, 'bars', 'support.class.widget'],
  [2, '.codes', 'variable.other.widget-path'],
  [2, '-label', 'variable.parameter.flag'],
  [3, 'gauge', 'support.class.widget'],
  [3, '-max', 'variable.parameter.flag'],
  [3, '50', 'constant.numeric'],
  [4, 'source', 'keyword.other.directive'],
  [4, 'in.logfmt', 'support.constant.source'],
  [4, 'field', 'support.function'],
  [4, 'tally', 'support.function'],
  [5, '/^5/', 'string.regexp'],
  [6, 'fn', 'storage.type.function'],
  [6, 'pct', 'entity.name.function'],
  [7, '.g', 'variable.other.widget-path'],
  [7, 'every', 'keyword.operator.word'],
  [7, '1s', 'constant.numeric']
];

registry.loadGrammar('source.arb').then((grammar) => {
  let ruleStack = vsctm.INITIAL;
  const tokensPerLine = lines.map((line) => {
    const r = grammar.tokenizeLine(line, ruleStack);
    ruleStack = r.ruleStack;
    return r.tokens;
  });

  let failed = 0;
  for (const [li, search, wantScope] of checks) {
    const line = lines[li];
    const col = line.indexOf(search);
    const toks = tokensPerLine[li];
    const tok = col >= 0 ? toks.find((t) => col >= t.startIndex && col < t.endIndex) : undefined;
    const scopes = tok ? tok.scopes.join(' ') : '(none)';
    const ok = scopes.includes(wantScope);
    if (!ok) failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  L${li} ${search.padEnd(12)} want=${wantScope.padEnd(28)} got=${scopes}`);
  }
  console.log(failed === 0 ? '\nALL TOKEN CHECKS PASSED' : `\n${failed} CHECK(S) FAILED`);
  process.exit(failed === 0 ? 0 : 1);
}).catch((e) => { console.error(e); process.exit(2); });
