/**
 * Provides utility functions, heavily inspired Python's itertools,
 * for working with iterable objects like `Array`, `Set`, `Map`, `String`,
 * Generators, and any other object implementing the iteration protocolls.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 */


/**
 * Yield all items from `iterable` for which `fn(item)` returns truthy.
 */
export function* filter(iterable, fn) {
  for (const item of iterable) {
    if (fn(item)) {
      yield item;
    }
  }
}


/**
 * Return the first item of the `iterable`.
 */
export const first = (iterable)=> {
  // NOTE: This closes any generator passed in and further iterations are not
  //       possible.
  const [item] = iterable;
  return item;
};

/**
 * Return the first item of the iterable for which `fn(item)` returns truthy.
 */
export const find = (iterable, fn)=> first(filter(iterable, fn));


/**
 * Return a sequence of integers starting from `start=0` up to but excluding
 * `stop` by incrementing the number by `step=1` in each iteration.
 *
 * Examples:
 * ```javascript
 *
 * > range(3)
 * [0, 1, 2]
 *
 * > range(1, 4)
 * [1, 2, 3]
 *
 * > range(1, 9, 2)
 * [1, 3, 5, 7]
 * ```
 */
export const range = (start, stop, step=1)=> {
  // TODO: Should we rather have this as a generator
  // and use [...range())] if we want an array?
  if (stop === undefined) {
    [start, stop] = [0, start];
  }

  const result = [];
  for (let i = start; i < stop; i += step) {
    result.push(i);
  }
  return result;
};


const defaultCmp = (a, b)=> {
  if (a === b) {
    return 0;
  }

  return (a > b ? 1 : -1);
};


/**
 * Return a sorted sequence of the `iterable`.
 * Unlike `Array.prototype.sort()` all items are compared using '<' and `===`.
 * The sorting may not be stable.
 */
export const sorted = (iterable, compare=defaultCmp)=>
  [...iterable].sort(compare);


/**
 * Map all items from `iterable` using `fn(item)`.
 *
 * Example:
 * ```javascript
 *
 * > [...map([1, 2, 3], (i)=> i*2)]
 * [2, 4, 6]
 * ```
 */
export function* map(iterables, fn) {
  for (const item of iterables) {
    yield fn(item);
  }
}


/**
 * Generate a sequence of `times` length repeating each `item`.
 */
export function* repeat(item, times=-1) {
  while (times) {
    yield item;
    times -= 1;
  }
}


/**
 * Generate the cartesian product of input iterables.
 *
 * Example:
 * ```javascript
 *
 * > [...product('abc', [1, 2])]
 * [
 *   ['a', 1],
 *   ['a', 2],
 *   ['b', 1],
 *   ['b', 2],
 *   ['c', 1],
 *   ['c', 2]
 * ]
 * ```
 */
export function* product(...iterables) {
  let result = [[]];

  for (const seq of iterables) {
    const rslt = [];
    for (const x of result) {
      for (const y of seq) {
        rslt.push([...x, y]);
      }
    }
    result = rslt;
  }

  for (const prod of result) {
    yield prod;
  }
}

/**
 * Return successive `size` length permutations of elements in the iterable.
 * If `size` is not specified, then it defaults to the length of the iterable
 * and all possible full-length permutations are generated.
 *
 * Permutations are emitted in lexicographic sort order.
 * So, if the input iterable is sorted, the permutation tuples will be produced
 * in sorted order.
 *
 * Elements are treated as unique based on their position, not on their value.
 * So if the input elements are unique, there will be no repeat values in each
 * permutation.
 *
 * Example:
 * ```javascript
 * > [...permutations('abc')]
 * [
 *   ['a', 'b', 'c'],
 *   ['a', 'c', 'b'],
 *   ['b', 'a', 'c'],
 *   ['b', 'c', 'a'],
 *   ['c', 'a', 'b'],
 *   ['c', 'b', 'a']
 * ]
 * ```
 */
export function* permutations(iterable, size) {
  const pool = [...iterable];
  const len = pool.length;
  size = size || len;

  for (const indices of product(...repeat(range(len), size))) {
    if ((new Set(indices)).size === size) {
      yield [...map(indices, (idx)=> pool[idx])];
    }
  }
}


export const arraysEqual = (a1, a2)=> {
  const length = Math.max(a1.length, a2.length);

  for (let i = 0; i < length; i+=1) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }

  return true;
};


/**
 * Return `size` length subsequences of elements from the input iterable.
 *
 * Combinations are emitted in lexicographic sort order.
 * So, if the input iterable is sorted, the combination tuples will be
 * produced in sorted order.
 *
 * Elements are treated as unique based on their position, not on their value.
 * So if the input elements are unique, there will be no repeat values in each
 * combination.
 *
 * Example:
 * ```javascript
 * > [...combinations('abc', 2)]
 * [
 *   ['a', 'b'],
 *   ['a', 'c'],
 *   ['b', 'c']
 * ]
 * ```
 */
export function* combinations(iterable, size) {
  const pool = [...iterable];
  const len = pool.length;

  for (const indices of permutations(range(len), size)) {
    if (arraysEqual(sorted(indices), indices)) {
      yield [...map(indices, (idx)=> pool[idx])];
    }
  }
}


/**
 * Return the iterator for an the `iterable`.
 */
export const iterator = (iterable)=> iterable[Symbol.iterator]();


/**
 * Generate a sequence of arrays with each array comntaining the next item
 * from each of the `iterables`.
 *
 * Example:
 * ```javascript
 *
 * > [...zip('abc', [1, 2, 3])]
 * [['a', 1], ['b', 2], ['c', 3]]
 *
 * > [...zip(['a', 1], ['b', 2], ['c', 3])]
 * ['abc', [1, 2, 3]]
 * ```
 */
export function* zip(...iterables) {
  const iters = [...map(iterables, iterator)];

  let stop = false;
  const next = (it)=> {
    const {done, value} = it.next();
    if (done) {
      stop = true;
    }
    return value;
  };

  // eslint-disable-next-line no-unmodified-loop-condition
  while (!stop) {
    // `stop` is being modified by `next()` to indicate that
    // we have finished iterating over any of the iters.
    // This saves us from having to iterate over the `results`
    // items to check if we are done.
    const results = [...map(iters, next)];

    if (!stop) {
      yield results;
    }
  }
}


/**
 * Generate an infinite sequence of integers starting from 0.
 */
export function* count() {
  let idx = 0;
  while (true) {
    yield idx;
    idx += 1;
  }
}


/**
 * Generate a sequence of `[index, item]` for each item of the iterable.
 * The index starts at 0 and increases by 1 with each item yielded.
 *
 * Example:
 * ```javascript
 *
 * > [...enumerate('abc')]
 * [[0, 'a'], [1, 'b'], [1, 'c']]
 * ```
 */
export function* enumerate(iterable) {
  yield * zip(count(), iterable);
}
