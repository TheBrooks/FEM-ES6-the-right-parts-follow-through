function foo3( x = 42){
  return x;
}

/*
  Parameter can be set to a default value in the function header with the `=` operator.
  If the parameter is passed in the default value is ignored.  If the parameter is not passed in or is passed in as `undefined` the parameter will take on the value of the default
*/
function default_x(x = 2){
  return x;
}
default_x();          // return 2
default_x(null);      // return null
default_x(undefined); // return 2
default_x(1);         // return 1

/* 
  Default value does not have to a constant.  It accept any expression that is valid.  Statements cannot be used as default values.
*/
function genId () {
  return 'generated_ID'
}
function default_function(uniqID = genId()){
  return uniqID;
}

/*
  default values are lazily called meaning that the expression is not called until they are needed.  The defaults are not cached either so every time a default is needed to fill in an empty parameter the expression is called again.  
*/
function print_bang() {
  return "! "  + Math.random();
}
function default_lazy( x = print_bang()) {
}
default_lazy(1);  //
default_lazy();   // ! [0, 1)
default_lazy(2);  //
default_lazy();   // ! [0, 1)

/*
  It is not forced that x must not be undefined after the default expression is executed.  this means Default Expressions can be used for other reasons than setting the default value.  
*/
function required(param) {
  throw "Parameter '" + param + "' required.";
}
function foo5(x = required('x')) {

}

/*
  default values can reference other parameters as long as they are left of where they are being used.  If the reference is to the right a ReferenceError will be thrown.
*/
function default_self_reference(x, y = x) {
  return y;
}
default_self_reference(1);    // 1
default_self_reference(1,2);  // 2


/* 
  the `...`, known as the `rest` operator is used in two difference ways depending on where it is present.
*/

/*
  when the `...` operator is present in a parameter list, it acts to 'gather' multiple passed in parameters into one variable array.
*/
function gather(...s){
  return s;
}
gather();         // []
gather(1);        // [ 1 ]
let q = 4
gather(1,2,'3',q) // [ 1, 2, '3', 4 ]

/*
  the `...` operator must be the last parameter in the list, placing any other parameter after it will cause a SyntaxError
*/
// function gather_not_last(...s,a) {}
// SyntaxError: Rest parameter must be last formal parameter

/*
  The `...` operator also cannot be defaulted in a parameter list.  If defaulting an `...` parameter a SyntaxError will be thrown.
*/
// function gather_defaulted(...g = []) {}
// SyntaxError: Rest parameter may not have a default initializer

/*
  the `...` operator can also be present outside of a parameter list.  when used on a list the `operator` 'spreads' the array out into seperate variables.
*/
function spread(a,b,c){
  return a + ' ' + b + ' ' + c;
}
spread(...[1,2,3]) // prints `1 2 3`

/*
  the `...` spread operator can be used in various useful situtation.
  for example array concatination is now much more clear
*/
// array concatination
let arr1 = [1,2]
let arr2 = [4,5]
let arr3 = [0, ...arr1, 3, ...arr2, 6]; // [ 0, 1, 2, 3, 4, 5, 6 ]

// array destructuing
let [aa, bb, ...cc] = arr3;
// aa = 0
// bb = 1
// cc = [ 2, 3, 4, 5, 6 ]

/* 
  the `...` spread operator can also be used to spread objects into variables during object destruction
*/
let obj = { x: 1, y: '2', a: 'hello', b:'world'}
let { x, y, ...z } = obj
// x = 1
// y = 2
// z = { a: 'hello', b: 'world' }


