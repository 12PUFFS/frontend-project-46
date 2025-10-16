import fs from 'fs';
import path from 'path';

const getFileContent = (filepath) => {
  try {
    const absolutePath = path.resolve(process.cwd(), filepath);
    const content = fs.readFileSync(absolutePath, 'utf-8');
    return content;
  } catch (error) {
    throw new Error(`Cannot read file: ${filepath}`);
  }
};

const parseFile = (filepath) => {
  const content = getFileContent(filepath);
  const extension = path.extname(filepath).toLowerCase();
  
  try {
    switch (extension) {
      case '.json':
        return JSON.parse(content);
      default:
        throw new Error(`Unsupported file format: ${extension}`);
    }
  } catch (error) {
    throw new Error(`Cannot parse file: ${filepath}`);
  }
};

export { getFileContent, parseFile };