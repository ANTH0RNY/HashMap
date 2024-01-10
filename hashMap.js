class Bucket {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashMap {
  constructor(size = 16) {
    this.buckets = Array(size).fill(null);
  }

  index(key) {
    return this.hash(key) % this.buckets.length;
  }

  loadFactor() {
    let count = 0;

    for (let i of this.buckets) {
      if (i !== null) count++;
    }
    return count / this.buckets.length;
  }

  increaseCapacity() {
    let newBuckets = Array(this.buckets.length * 2).fill(null);
    for (let i in this.buckets) {
      newBuckets[i] = this.buckets[i];
    }
    this.buckets = newBuckets;
  }

  hash(key) {
    let myHash = 0;
    const prime = 97;

    for (let i in key) {
      myHash = prime * myHash + key.charCodeAt(i);
    }
    // console.log(myHash);
    return myHash;
  }

  set(key, value) {
    if (this.loadFactor() >= 0.5) {
      this.increaseCapacity();
    }

    const index = this.hash(key) % this.buckets.length;

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    this.buckets[index] = new Bucket(key, value);
  }

  get(key) {
    const index = this.hash(key) % this.buckets.length;
    return this.buckets[index] === null ? null : this.buckets[index].value;
  }
  has(key) {
    const index = this.index(key);

    if (this.buckets[index] === null || this.buckets[index].key !== key) {
      return false;
    }
    return true;
  }

  remove(key) {
    const index = this.index(key);
    if (this.buckets[index] !== null && this.buckets[index].key === key) {
      const bucket = this.buckets[index];
      this.buckets[index] = null;

      return bucket;
    }
    return null;
  }

  length() {
    let count = 0;
    for (let i of this.buckets) {
      if (i !== null) count++;
    }
    return count;
  }

  clear() {
    for (let i in this.buckets) {
      this.buckets[i] = null;
    }
  }

  keys() {
    const keyz = [];
    for (let i of this.buckets) {
      if (i !== null) keyz.push(i.key);
    }

    return keyz;
  }

  values() {
    const valuez = [];

    for (let i of this.buckets) {
      if (i !== null) valuez.push(i.value);
    }

    return valuez;
  }

  entries() {
    const entriez = [];
    for (let i of this.buckets) {
      if (i !== null) entriez.push([i.key, i.value]);
    }
    return entriez;
  }
}

const H1 = new HashMap();
// H1.hash("hello");
H1.set("hello", "world");
// console.log(H1.loadFactor());
H1.set("second", "value 2");
H1.set("key", "value 3");
console.log(H1.buckets);
console.log(H1.buckets.length);
console.log(H1.entries());
// console.log(H1.clear());
// console.log(H1.buckets);
