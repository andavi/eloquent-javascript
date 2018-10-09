const range = (start, end, step=1) => {
  const arr = [];
  for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
    arr.push(i);
  }
  return arr;
};

const sum = arr => arr.reduce((a, n) => a + n);

console.log(range(1, 10));
console.log(range(5, 2, -1));
console.log(sum(range(1, 10)));