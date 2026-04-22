// KARDRA — AI image generator
//
// Generates the brand images defined in src/utils/imagePrompts.js using
// OpenAI's DALL-E 3 API and stores them under public/assets/ai/.
//
// How to run:
//   1. Make sure .env contains VITE_OPENAI_API_KEY=sk-...
//   2. From the project root:  node scripts/generate-images.mjs
//   3. Optional flags:
//        --only=hero_bg,about_section   Generate only specific prompt keys
//        --force                        Regenerate even if the file already exists
//        --quality=hd|standard          DALL-E 3 quality (default: hd)
//        --style=natural|vivid          DALL-E 3 style (default: natural)
//
// Notes:
//   - Uses native fetch (Node 18+), no external SDK.
//   - Reads .env manually (no dotenv dependency).
//   - Skips images that already exist unless --force is passed.

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const envPath = resolve(projectRoot, '.env');
const outputDir = resolve(projectRoot, 'public/assets/ai');
const promptsModuleUrl = pathToFileURL(
  resolve(projectRoot, 'src/utils/imagePrompts.js'),
).href;

const OPENAI_ENDPOINT = 'https://api.openai.com/v1/images/generations';
const MODEL = 'dall-e-3';

function parseArgs(argv) {
  const args = { only: null, force: false, quality: 'hd', style: 'natural' };
  for (const raw of argv.slice(2)) {
    if (raw === '--force') {
      args.force = true;
      continue;
    }
    const [flag, value] = raw.split('=');
    if (flag === '--only' && value) {
      args.only = value.split(',').map((k) => k.trim()).filter(Boolean);
    } else if (flag === '--quality' && value) {
      args.quality = value;
    } else if (flag === '--style' && value) {
      args.style = value;
    }
  }
  return args;
}

async function loadEnv(path) {
  try {
    const content = await readFile(path, 'utf8');
    const env = {};
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      env[key] = value;
    }
    return env;
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`Cannot find .env at ${path}. Create one with VITE_OPENAI_API_KEY=...`);
    }
    throw err;
  }
}

async function fileExists(path) {
  try {
    await access(path, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function generateImage({ apiKey, prompt, size, quality, style }) {
  const response = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      size,
      quality,
      style,
      n: 1,
      response_format: 'b64_json',
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${text}`);
  }

  const payload = await response.json();
  const item = payload?.data?.[0];
  if (!item?.b64_json) {
    throw new Error('OpenAI response did not include b64_json image data.');
  }
  return Buffer.from(item.b64_json, 'base64');
}

async function main() {
  const args = parseArgs(process.argv);

  console.log('KARDRA image generator');
  console.log('----------------------');
  console.log(`Project root : ${projectRoot}`);
  console.log(`Output dir   : ${outputDir}`);
  console.log(`Quality/Style: ${args.quality} / ${args.style}`);
  if (args.only) console.log(`Only keys    : ${args.only.join(', ')}`);
  console.log('');

  const env = await loadEnv(envPath);
  const apiKey = env.VITE_OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_OPENAI_API_KEY not found in .env or environment.');
  }

  const { imagePromptList } = await import(promptsModuleUrl);
  const selected = args.only
    ? imagePromptList.filter((p) => args.only.includes(p.key))
    : imagePromptList;

  if (selected.length === 0) {
    console.warn('No prompts selected. Check the --only flag.');
    return;
  }

  await mkdir(outputDir, { recursive: true });

  const results = { ok: [], skipped: [], failed: [] };

  for (const entry of selected) {
    const targetPath = resolve(outputDir, entry.filename);
    const exists = await fileExists(targetPath);
    if (exists && !args.force) {
      console.log(`[skip] ${entry.key} -> ${entry.filename} (already exists, use --force)`);
      results.skipped.push(entry.key);
      continue;
    }

    console.log(`[gen ] ${entry.key} (${entry.size}) -> ${entry.filename}`);
    try {
      const buffer = await generateImage({
        apiKey,
        prompt: entry.prompt,
        size: entry.size,
        quality: args.quality,
        style: args.style,
      });
      await writeFile(targetPath, buffer);
      console.log(`       saved ${(buffer.length / 1024).toFixed(1)} KB`);
      results.ok.push(entry.key);
    } catch (err) {
      console.error(`[fail] ${entry.key}: ${err.message}`);
      results.failed.push({ key: entry.key, error: err.message });
    }
  }

  console.log('');
  console.log('Summary');
  console.log('-------');
  console.log(`Generated: ${results.ok.length}`);
  console.log(`Skipped  : ${results.skipped.length}`);
  console.log(`Failed   : ${results.failed.length}`);
  if (results.failed.length > 0) {
    for (const f of results.failed) {
      console.log(`  - ${f.key}: ${f.error}`);
    }
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
