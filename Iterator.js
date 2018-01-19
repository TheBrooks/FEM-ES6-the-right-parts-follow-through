/*
  An iterator is a patterened way of stepping through a set of data from a 
  data source.
*/
var arr = [1, 2, 3]; // The array class comes shipped with an iteraror

/*
  The iterator on an aray can be manually retrieved via the know iterator 
  Symbol
  An iterator has a method .next() that returns an object `{value: any,dont: 
  bool}` on each call. an iterator is `done:true` whenever it passes true, but 
  usually passes `done:true` on the .next() call after the last value has been 
  returned.
*/
var it = arr[Symbol.iterator]();
it.next(); // { 'value': 1, 'done': false }
it.next(); // { 'value': 2, 'done': false }
it.next(); // { 'value': 3, 'done': false }
it.next(); // { 'value': undefined, 'done': true }

/*
  the `for of` loop is a canvience loop that takes takes anything iterable 
  (that has an [Symbol.iterator]() method on it) and runs .next() until 
  `done:true` passing the `value:` as the variable of the loop
*/
for (var v of arr) {
  // console.log(v);
}

/*
  strings are also iterable.
*/
var str = 'hello';
for (var c of str) {
  // console.log(c)
}

/*
  Objects by default are not iterable because they are not shipped with an 
  iterator BUT you can turn an object into an iterable by adding iterator 
  functionality.
*/
var obj = {
  /* the object can be an iterable with the [Symbol.iterator]() concise 
  methodthat returnis an iterable (an iterable has a .next() function that 
  calls and returns an `{value:,done}` object) */
  [Symbol.iterator]() {
    var idx = this.start,
      en = this.end;

    var it = {
      next: () => {
        if (idx <= en) {
          var v = this.values[idx];
          idx++;
          return { value: v, done: false };
        } else {
          return { done: true };
          // value will be undefined if not added into the returned object
        }
      }
    };

    return it;
  },
  values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
  start: 4,
  end: 13
};

var vals = [...obj];
// vals = [10,12,14,16,18,20,22,24,26,28]

/*
  a generator is a function that when called does not execute the code 
  immediately but instead it creates an iterator that controls the generator.

  The generator stays paused until .next() is called on it and then runs until 
  it hits either a `yield` or a `return`.

  `yield` is a way to 'pause' the generator until another .next() call resumes 
  the code.  when a `yield x` is called it returns an object `{value: x, done: 
  false}`.  if there is no x, it is defaulted to undefined.

  When the generator function hits a `return x` or end of function scope a 
  `{value: x(or undefined), done:true}` is retuned and the generator is 
  exhaused.
*/
function* gen_func() {
  console.log('oh');
  yield; // tells the generator to pause
  console.log('hello');
  yield 9; // can also send the value out
  console.log('world');
  return 10;
}
var it = gen_func();
it.next(); // {value: undefined, done: false } print 'oh'
it.next(); // {value: 9, done: false } print 'hello'
it.next(); // {value: 10, done: true } print 'world'

/*
  because a generator returns an iterator it can be used in a `for of` loop
*/
var a = [];
for (var v of gen_func()) {
  a.push(v);
}
// a = [undefined, 9];
/*
  the 10 does not print because return sets done:true and the value is 
  ignored.  if you change return 10 to yield 10 then the 10 will also be added 
  into the array
*/

/*
  using a generator as an object iterator greatly simplifies the code
*/
var obj_gen = {
  *[Symbol.iterator]() {
    for (var i = this.start; i <= this.end; i++) {
      yield this.values[i];
    }
  },
  values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
  start: 4,
  end: 13
};

var vals = [...obj_gen];
// vals = [10,12,14,16,18,20,22,24,26,28]
