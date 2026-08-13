import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

const parseJSON = (data) => JSON.parse(data);

const parseYAML = (data) => yaml.load(data);

const parsers = {
  '.json': parseJSON,
  '.yml': parseYAML,
  '.yaml': parseYAML,
};

export default (filePath) => {
  const ext = path.extname(filePath);
  const parser = parsers[ext];

  if (!parser) {
    throw new Error(`Unsupported file format: ${ext}`);
  }

  const data = fs.readFileSync(filePath, 'utf-8');
  return parser(data);
};
