function arrayToList(arr) {
  if (arr.length === 0) return null;
  return {value: arr[0], rest: arrayToList(arr.slice(1))};
}

function listToArray(list) {
  const arr = [];
  for (let node = list; node; node = node.rest) {
    arr.push(node.value);
  }
  return arr;
}

function prepend(value, list) {
  return {value, rest: list};
}

function nth(list, index) {
  if (!list) return undefined;
  if (index === 0) return list.value;
  return nth(list.rest, index - 1);
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20