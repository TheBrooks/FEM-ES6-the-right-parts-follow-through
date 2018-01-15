function foo_f0() {
  return 'basic function';
}
function foo_f1(x) {}
function foo_f2(x, y) {}
function foo_f3(...x) {}

foo_a0 = () => 'basic function as arrow';
foo_a1 = x => '';
foo_a1_parens = x => '';
foo_a2 = (x, y) => '';
foo_a3 = (...x) => '';

foo_a0_curly = () => {
  return '';
};
foo_a1_curly = x => {
  return '';
};
foo_a1_parens_curly = x => {
  return '';
};
foo_a2_curly = (x, y) => {
  return '';
};
foo_a3_curly = (...x) => {
  return '';
};
foo_a0_object_return = () => ({ y: 3 });

// arrow functions are annonymous.
// no convenient self reference (recusion is not as nice)
// debug stack trace are less helpful than functions with names
// name inferencing can help name annonymous functions based on where theyre saved
// name inderencing does not happen in parameters, which just so happens to be the most likely place you will use arrow functions
console.log(foo_f0());
console.log(foo_a0());
