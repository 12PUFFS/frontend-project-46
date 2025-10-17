import yaml from 'js-yaml';

const parse = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

export default parse;