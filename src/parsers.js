import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export default function parseFile (filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const ext = path.extname(filepath);

  if (ext === '.json') {
    return JSON.parse(content);
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(content);
  }
  throw new Error(`Unsupported file format: ${ext}`);
}
