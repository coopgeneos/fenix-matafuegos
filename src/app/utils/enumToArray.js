module.exports = (enumerator) => {
  let keys = Object.keys(enumerator);
  let values = Object.values(enumerator);
  let list = [];
  keys.forEach((_, i) => {
    list.push({key: keys[i], value: values[i]})
  });
  return list;
}