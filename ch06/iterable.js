class Group {
  constructor() {
    this.contents = [];
  }
  add(item) {
    if (!this.has(item)) this.contents.push(item);
  }
  delete(item) {
    this.contents = this.contents.filter(i => i !== item);
  }
  has(item) {
    return this.contents.includes(item);
  }
  static from(iterable) {
    const group = new Group();
    for (let item of iterable) {
      group.add(item);
    }
    return group;
  }
  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.i = 0;
    this.group = group;
  }
  next() {
    if (this.i >= this.group.contents.length) return {done: true};
    let value = this.group.contents[this.i];
    this.i++;
    return {value, done: false};
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c