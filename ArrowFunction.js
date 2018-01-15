/*
 There are many way to declare a function with a return
 Their look does not differ besides the number of parameters
*/
function func_zero_param() {
  return 'zero parameters function';
}
function func_one_param(x) {
  return 'one parameters function';
}
function func_many_param(x, y) {
  return 'many parameters function';
}
function func_spread_param(...y) {
  return 'spread parameter function';
}

/*
 arrow functios on the other hand can have many different
 forms depending on how many parameters, number of
 expressions and type of variable being returned.
*/
arrow_zero_param = () => {
  return 'zero parameter arrow function';
};
// prettier-ignore
arrow_one_param = (x) => {
  return 'one parameter arrow function';
}
arrow_one_param_no_paren = x => {
  return 'if the arrow function had one and only one parameter then the parens can be omitted';
};
arrow_many_param = (x, y) => {
  return 'many parameters arrow function';
};
arrow_spread_param = (...y) => {
  return 'spread parameter function';
};

/*
 if there is only one expression the curly braces and the
 expression is returned without need of the `return` keyword
*/
arrow_no_curly = () => 'arrow function with no curly';

/*
 if there are multiple expression, the curly braces and
'return' must be present
*/
arrow_multiple_loc = x => {
  let z = x * 2;
  return 'arrow multiple lines of code';
};

/*
  a comma operator may be used to move multiple expressions into one line of code and so curlys and a `return` can be ommited.  The last expression in the comma chain will be returned.
  However because the comma operator has lower priority than the arrow operator, the chained comma commands must be wrapped in parens
*/
arrow_comma_operator = () => (console.log('executed'), 'arrow comma operator');

/*
  if returning an object with the implicit `return` the object must be wrapped in parens
*/
arrow_object_return = () => ({ w: 42 });

/*
  parameters in an arrow function can have a default value
*/
arrow_default_param_values = (x, y = 3) => 'arrow function defaulted parameter values';

/*
  Arrow functions has an extra feature that is very useful in that it 
  lexically bind `this`.  This is very useful for callback functions where 
  the context has changed and `this` is different than the object that 
  created the call back.  Previously where a `.bind(this)` was neccesary,
  an arrow function can replace it seamlessly
*/
var obj = {
  id: 42,
  foo_bindThis: function() {
    setTimeout(
      function() {
        console.log(this.id);
      }.bind(this),
      100
    );
  },
  foo_arrowCallBack: function() {
    setTimeout(() => console.log(this.id), 100);
  }
};

/*
  Because arrow functions are annonymous they can be inconvenient when
  attempting to debug a stack trace.  although name there is inference
  rules that help label annonymous functions based on their surroundings
  there are currently no name inferencing rules for annonymous functions 
  used in parameters.  This just happens to be the most likely place an
  arrow function will be used by a developer.
  
  It can also be difficult to create elegant recursive functions with arrow 
  functions, though it is possible.

  With arrow functions striving to be a succinct as possible, error or null 
  checking is often ommited.  this can lead to the function blowing up if 
  inputs are not as expected.  doubled with the hard to identify stack trace
  this could potentially be time consuming to find and fix.
*/
