let arrays = [[1, 2, 3], [4, 5], [6]];

console.log(arrays.reduce((result, arr) => result.concat(arr)));

// → [1, 2, 3, 4, 5, 6]