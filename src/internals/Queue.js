export default class Queue {
  constructor() {
    this.internal = [];
  }

  isEmpty() {
    return !(this.internal && this.internal.length > 0);
  }

  enqueue(value) {
    this.internal.push(value);
  }

  // returns the value of the element popped
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty!");
    }

    return this.internal.shift();
  }
}
