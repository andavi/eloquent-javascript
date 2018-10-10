function everyV1(array, test) {
  for (let n of array) {
    if (!test(n)) return false;
  }
  return true;
}

// DeMorgan's Law: a && b equals !(!a || !b)
function every(array, test) {
  return !array.some(n => !test(n));
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true