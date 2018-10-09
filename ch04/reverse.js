function reverseArray(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}

function reverseArrayInPlace(arr) {
  for (let i = 0; i < arr.length / 2; i++) {
    let j = arr.length - 1 - i;
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]