import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, delimiter } from 'node:path';
import { spawnSync } from 'node:child_process';

test('Vercel command selects the pilot build only for preview and preserves production/default builds', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  const directory = mkdtempSync(join(tmpdir(), 'hsk-preview-command-'));
  const capture = join(directory, 'capture');
  try {
    writeFileSync(join(directory, 'npm'), '#!/bin/sh\nprintf "%s|%s" "$VITE_HSK1_PILOT_PREVIEW" "$*" > "$HSK_TEST_CAPTURE"\n', { mode: 0o755 });
    for (const target of ['preview', 'production', '']) {
      const env = { ...process.env, PATH: `${directory}${delimiter}${process.env.PATH}`, HSK_TEST_CAPTURE: capture, VERCEL_ENV: target };
      delete env.VITE_HSK1_PILOT_PREVIEW;
      const result = spawnSync('sh', ['-c', config.buildCommand], { env, encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
      assert.equal(readFileSync(capture, 'utf8'), target === 'preview' ? 'true|run build -- --mode hsk1-preview' : '|run build');
    }
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
