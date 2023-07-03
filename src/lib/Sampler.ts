export class Sampler<T> {
  private source: T[];
  private tracker: T[];

  constructor(array: T[]) {
    this.source = [...array];
    this.tracker = [...array];
  }

  pick(): T {
    if (this.tracker.length === 0) {
      this.tracker = [...this.source];
    }

    const randomIndex = Math.floor(Math.random() * this.tracker.length);
    const [item] = this.tracker.splice(randomIndex, 1);

    return item;
  }
}
