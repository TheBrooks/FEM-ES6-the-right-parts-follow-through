
// ------------------------------ var ------------------------------

/* 
  `var` variables are mutable meaning that they can be reassigned
*/
function var_mutable(){
  var v = 'initial';
  console.log(v);  // print `initial`
  v = 'updated';
  console.log(v); //print `updated`
}

/*
  `var` variables can be declared multiple times.  Redefining the `var`
  does not reset the value. Some find this can be helpful if you wish 
  to be more verbose in code for readability or if the vairable is used 
  many lines of code apart.  Even if the `var` is redeclared within a 
  block it will modify the `var` for the whole function.
*/
function var_multiple_define() {
  var v;
  var v = 10;
  v = 20;
  console.log(v); // print `20`
  var v;
  console.log(v); // print `20`
  v = 30;
  console.log(v); // print `30`
  {
    var v = 40;
    console.log(v); //print `40`
  }
  console.log(v); //print `40`
}

/* 
  when a `var` object is declaired in a method the variable definition 
  is `hoisted` to the beginning of the method.  This can cause problems 
  where if the variable is referenced before it is assigned it will be
  undefined instead of throwing a reference error.
*/
function var_hoist() {
  console.log(v); // print `undefined`
  var v = 10;
  console.log(v); // print `10`
}

/* 
  this problem is further evident if the `var` is declared in a block inside
  the function.  The `var` definition is `hoisted` outside of the block and 
  up to the top of the method.  This can cause confusion in the scope.  
  Furthermore the `var` variable is still defined and accessable with the 
  value it was assigned with after the block that the `var` variable was was 
  created in.  This can lead to confusion of scope issues that make the code 
  hard to understand for a future developer.
*/
function var_block_hoist_if() {
  console.log(v); // print `undefined`
  if (true){
    var v = 20;
    console.log(v); //print `20`
  }
  console.log(v); //print `20`
}
function var_block_hoist_for() {
  console.log(v);  //print `undefined`
  for(var v = 0; v < 5; v++){
    console.log(v) // print `0` through `4`
  }
  console.log(v); // print `5`
}

/*
  `var` variables used in a callback does not get closured.  Instead whenever 
  the callback accesses the variable it get the current value of the variable 
  instead of the value it had assigned at the time of creating the callback/closure.
*/
function var_closure(){
  var v = 10;
  setTimeout(function delay100() {
    console.log(v); //print `20`
  }, 200);
  var v = 20;
}
function var_for_closure(){
  for(var v = 0; v < 5; v++){
    setTimeout(function delay100() {
      console.log(v); // print `5` five times
    },100);
  }
}



// ------------------------- let ---------------------------------

/*
  `let` variables are mutable similar to `var`
*/
function let_mutable() {
  let l = 'initial';
  console.log(l); //print `initial`
  l = 'updated';
  console.log(l) //print `updated`
}

/*
  let variables are block scoped.  A `let` variable is only accessable within the 
  block and nested blocks it is declared in.  If accessed outside of the block a 
  ReferenceError is thrown.  
*/
function let_scope_block(){
  {
    let l = 10;
    console.log(l); // print `10`
  }
  // console.log(l);  `ReferenceError: l is not defined`
}
/*
  a nested block can declare a variable of the same name as a `let` variable in an 
  outer block.  when referenced in the inner block the inner variable will be accessed.
*/
function let_nexted_blocks() {
  let l = 10;
  {
    let l = 20;
    console.log(l); // print `20`
  }
  console.log(l); // print `10`
}

/*
  if inside the nested block a 'var' is used with the same name as the `let` 
  a SyntaxError will be thrown.  This is becase the `var` varibale declaration 
  will be hoisted to the top of the function.  This will compete with the `let` 
  variable declaration later on and since `let` variables cannot be redeclared 
  the Error is thrown.
*/
function let_var_nexted_blocks() {
  let l = 10;
  {
    // var l = 20; `SyntaxError: Identifier 'l' has already been declared`
  }
}

/*
  Since let variables are reclaimed after their scope block is exited a `let` 
  variable of the same name can be used in a new, non child block later
*/
function let_scope_later_block(){
  {
    let l = 20;
    console.log(l); // print `20`
  }

  {
    let l = 30;
    console.log(l); //print `30`
  }
}

/* 
  `let` variables are not hoisted like `var` variables are.  If attempting to reference 
  a `let` varibale before it has been declared causes a ReferenceError.  The time 
  between a block opening and the `let` being declared in known as the 'temporal dead zone'
*/
function let_TDZ(){
  // console.log(l);  `ReferenceError: l is not defined`
  let l;
  console.log(l);  // print `undefined`
}

/*
  `let` variables can only be declared once per block scope. If the same `let` 
  variable is declared twice then a SyntaxError will be thrown
*/
function let_defined_once() {
  let l;
  // let l = 10; `SyntaxError: Identifier 'l' has already been declared`
}

/*
  `let` variables refenced in a closure keep the value they have at the time of closure creation
*/
function let_closure(){
  let l = 10;
  setTimeout((() => console.log(l)),100); // print `10`
  l = 20;
}
function let_closure_for(){
  for(let l = 0; l < 5; l++){
    setTimeout(function delay100() {
      console.log(l); // prints `0` through `4`
    }, 100);
  }
}

// ----------------------------- const -------------------------

/*
  `const` variables are immutable meaning that the variable cannot be reassigned. 
*/
function const_immuteable() {
  const c = 'inital';
  console.log(c); // print `initial`
}
/*
  Because they are immutable they must be assigned a value when they are declared.  
  declaring a const without assigning a value will yield a SyntaxError
*/
function const_declare_but_not_assign() {
  // const c; `SyntaxError: Missing initializer in const declaration`
}

/*
  `const` variables share the same scoping rules as `let`.  any of the above `let` 
  examples that dead with scoping will work with `const` as well.
*/

/*
  If a variable is `const` that does not mean the value cannot change.  it only means the variable cannot be reassigned.  This means that if a `const` is pointing at an object, like an Array, the `const` cannot be set to point to a different Array, but the Array still has the ability to be changed.
*/
function const_mutable_object() {
  const c = [1,2,3];
  console.log(c); // print `[ 1, 2, 3 ]`
  c.push(4);
  console.log(c); // print `[ 1, 2, 3, 4 ]`
}

/*
  If you wish to make the object immutable there is the JS function Object.freeze() that will make a the object immutable shallowly.  This however has nothing to do with the variable being `const`, `let`, or `var`.  Do not think that `const` has any power over the immutability, or lack there of, of the value.  `const` only has power over the immutability of the reference in which its variable points to.
*/
function const_freeze(){
  const c = Object.freeze([1,2,3]);
  // c.push(4); `TypeError: Cannot add property 3, object is not extensible`
}
function let_freeze(){
  let l = Object.freeze([1,2,3]);
  // l.push(4); `TypeError: Cannot add property 3, object is not extensible`
}
function var_freeze(){
  var v = Object.freeze([1,2,3]);
  // v.push(4); `TypeError: Cannot add property 3, object is not extensible`
}




