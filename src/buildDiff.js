const buildDiff = (obj1, obj2) => {
  const keys = [
    ...new Set([...Object.keys(obj1), ...Object.keys(obj2)]),
  ].sort();

  return keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!(key in obj2)) {
      return { key, type: 'removed', value: value1 };
    }
    if (!(key in obj1)) {
      return { key, type: 'added', value: value2 };
    }
    if (
      typeof value1 === 'object' &&
      value1 !== null &&
      typeof value2 === 'object' &&
      value2 !== null
    ) {
      return { key, type: 'nested', children: buildDiff(value1, value2) };
    }
    if (value1 !== value2) {
      return {
        key,
        type: 'changed',
        oldValue: value1,
        newValue: value2,
      };
    }
    return { key, type: 'unchanged', value: value1 };
  });
};

export default buildDiff;
