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
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false