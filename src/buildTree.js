import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  
  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    
    if (!_.has(data1, key)) {
      return { key, value: value2, type: 'added' };
    }
    
    if (!_.has(data2, key)) {
      return { key, value: value1, type: 'removed' };
    }
    
    if (_.isEqual(value1, value2)) {
      return { key, value: value1, type: 'unchanged' };
    }
    
    return {
      key,
      oldValue: value1,
      value: value2,
      type: 'updated'
    };
  });
};

export default buildTree;