import {iterator} from './itertools';
import {first, find} from './itertools';
import {sorted, range} from './itertools';
import {count, repeat} from './itertools';
import {map, filter, enumerate, zip} from './itertools';
import {product, permutations, combinations} from './itertools';


describe('iterator()', ()=> {
  it('returns an iterator for an iterable', ()=> {
    const it = iterator('abc');

    expect(it.next()).toEqual({value: 'a', done: false});
    expect(it.next()).toEqual({value: 'b', done: false});
    expect(it.next()).toEqual({value: 'c', done: false});
    expect(it.next()).toEqual({value: undefined, done: true});
  });
});


describe('first()', ()=> {
  it('returns the first item of an iterable', ()=> {
    expect(first('abc')).toBe('a');
  });
});


describe('find()', ()=> {
  it('finds the first matching item', ()=> {
    expect(find('abc', (str)=> str === 'b')).toBe('b');
  });
});


describe('sorted', ()=> {
  it('returns a sorted list of items', ()=> {
    expect(sorted([1, 4, 3, 11, 3])).toEqual([1, 3, 3, 4, 11]);
  });
});


describe('range(start=0, stop, step=1)', ()=> {
  it('returns a list of integers starting from 0', ()=> {
    expect(range(3)).toEqual([0, 1, 2]);
  });

  it('returns a list of integers starting and stopping at given args', ()=> {
    expect(range(1, 4)).toEqual([1, 2, 3]);
  });

  it('returns a list of integers with step arg', ()=> {
    expect(range(1, 9, 2)).toEqual([1, 3, 5, 7]);
  });
});


describe('count()', ()=> {
  it('generates a sequence of incremental integers starting from 0', ()=> {
    const [n1, n2, n3] = count();

    expect([n1, n2, n3]).toEqual([0, 1, 2]);
  });
});


describe('repeat()', ()=> {
  it('generates a sequence repeating the same item n-times', ()=> {
    expect([...repeat('a', 3)]).toEqual(['a', 'a', 'a']);
  });

  it('repeats the same item until iteration is stopped', ()=> {
    const [n1, n2, n3] = repeat('a');

    expect([n1, n2, n3]).toEqual(['a', 'a', 'a']);
  });
});


describe('filter', ()=> {
  it('filters out items from an iterable', ()=> {
    expect(
      [...filter([1, 2, 3, 4], (i)=> i % 2 === 0)]
    ).toEqual(
      [2, 4]
    );
  });
});


describe('map()', ()=> {
  it('generates a sequence with each item mapped using the mapping fn', ()=> {
    expect(
      [...map([1, 2, 3], (i)=> i * 2)]
    ).toEqual(
      [2, 4, 6]
    );
  });
});

describe('enumerate()', ()=> {
  it('creates a seq of [index, item] for each item in a sq', ()=> {
    expect(
      [...enumerate('abc')]
    ).toEqual(
      [[0, 'a'], [1, 'b'], [2, 'c']]
    );
  });
});


describe('zip(...sequences)', ()=> {
  it('generates a sequence combining each next item from each seq', ()=> {
    expect([...zip('abc', [1, 2, 3])]).toEqual([['a', 1], ['b', 2], ['c', 3]]);
  });
});


describe('product()', ()=> {
  it('generates a cartesian product of the sequences', ()=> {
    expect(
      [...product('abc', [1, 2])]
    ).toEqual([
      ['a', 1],
      ['a', 2],
      ['b', 1],
      ['b', 2],
      ['c', 1],
      ['c', 2]
    ]);
  });
});


describe('permutations()', ()=> {
  it('generates all permutations of the items of a seq', ()=> {
    expect(
      [...permutations('abc')]
    ).toEqual([
      ['a', 'b', 'c'],
      ['a', 'c', 'b'],
      ['b', 'a', 'c'],
      ['b', 'c', 'a'],
      ['c', 'a', 'b'],
      ['c', 'b', 'a']
    ]);
  });

  it('generates all permutations of items of a seq given a size', ()=> {
    expect(
      [...permutations('abc', 2)]
    ).toEqual([
      ['a', 'b'],
      ['a', 'c'],
      ['b', 'a'],
      ['b', 'c'],
      ['c', 'a'],
      ['c', 'b']
    ]);
  });
});


describe('combinations()', ()=> {
  it('generates all combinations of items of a seq given a size', ()=> {
    expect(
      [...combinations('abc', 2)]
    ).toEqual([
      ['a', 'b'],
      ['a', 'c'],
      ['b', 'c']
    ]);
  });
});
