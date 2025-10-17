const _ = require('lodash')

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)))

  return keys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (!_.has(data1, key)) {
      return {
        key,
        value: value2,
        type: 'added',
        children: _.isObject(value2) && !_.isArray(value2) ? buildTree({}, value2) : [],
      }
    }

    if (!_.has(data2, key)) {
      return {
        key,
        value: value1,
        type: 'removed',
        children: _.isObject(value1) && !_.isArray(value1) ? buildTree(value1, {}) : [],
      }
    }

    if (_.isObject(value1) && _.isObject(value2) && !_.isArray(value1) && !_.isArray(value2)) {
      return {
        key,
        type: 'nested',
        children: buildTree(value1, value2),
      }
    }

    if (_.isEqual(value1, value2)) {
      return {
        key,
        value: value1,
        type: 'unchanged',
      }
    }

    return {
      key,
      oldValue: value1,
      value: value2,
      type: 'updated',
    }
  })
}

module.exports = buildTree
