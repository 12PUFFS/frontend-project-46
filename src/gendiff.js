import { parseFile } from './parsers.js';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  
  const diffLines = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    
    if (!_.has(data1, key)) {
      return `  + ${key}: ${value2}`;
    }
    
    if (!_.has(data2, key)) {
      return `  - ${key}: ${value1}`;
    }
    
    if (_.isEqual(value1, value2)) {
      return `    ${key}: ${value1}`;
    }
    
    return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
  });
  
  return `{\n${diffLines.join('\n')}\n}`;
};

export default genDiff;