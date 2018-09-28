const size = 12;
let board = '';

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    board += (i + j) % 2 === 0 ? ' ' : '#';
  }
  board += '\n';
}
console.log(board);