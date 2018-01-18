/*
  Destructing is the concept of taking a larger object and splitting it 
  up, assigning it into smaller, individual objects.
  There are many convenience and reablility benifits to letting javascript 
  handle destructing arrays and objects over explicitly writing the code 
  yourself. The syntax for destructuring an array is labeled below.  
*/

var foo1 = [1,2,3,4,,6]; 
/*
  an array can be split into assignable variables on the left if wrapped in `[]`.
*/
var foo1 = [1,2,3]
var [a,b,c] = foo1;
// a= 1, b=2, c=3

/*
  There does not need to be the exact correct number of variables in the array 
  to destructure.  If there are too few the remaining assignable variables will 
  be assigned undefined.  if there are too many the extra are left off.
*/
var foo1 = [1,2,3,4,5,6]; 
var [a,b,c,d,e] = foo1;
// a=1, b=2, c=3, d=4, e=5
var [a,b,c,d,e,f,g] = foo1;
//  a=1, b=2, c=3, d=4, e=5, f=6, g=undefined
g=10;
var [a,b,c,d,e,f,g] = foo1;
//  a=1, b=2, c=3, d=4, e=5, f=6, g=undefined

/*
  the assignable variables in array destructing can handle defaults.  If the value 
  is missing or undefined the value will be assigned the default instead.
*/
var foo1 = [1,2,3,4];
var [a,b,c,d,e = 42] = foo1;
// a=1, b=2, c=3, d=4, e=42
var foo1 = [1,,3];
var [a=5,b=6,c=7] = foo1;
// a=1, b=6, c=3

/*
  the gather variable can be used with the last assignable variable in destructuing 
  and will gather what is left in the array that has not been destructured and put 
  it into an array
*/
var foo1 = [1,2,3,4]
var [a, ...b] = foo1;
// a=1, b=[ 2, 3, 4 ]

/*
  the left hand side of destructuring is an assignment.  This means that variables 
  do not need to be declared at the destructing line.  The only requirement is that 
  the LHS variables must be valid on the LHS.
*/
var foo1 = [1,2,3,4,,6]; 
var a,b,c,rest;
[a,b,c,...rest] = foo1;
// a=1, b=2, c=3, rest=[ 4 , , 6 ];

/*
  an array destructing expects an iterable.  if the value is null, undefined or not 
  itterable a runtime error will be thrown.
  The best way to avoid this is to `||` or a default empty array.  if the first array 
  is null or undefined it will default to a backup empty array and assign undefined to 
  the variables.
*/
function foo_null() {
  return null;
}
// var [a,b,c] = foo_null(); // error
var [a,b,c] = foo_null() || []; 


/*
  Array Destructing can be used to swap variables without an explicit temp varaible created.
*/
var a = 10, b = 20
[a,b] = [b,a]
// a = 20, b = 10

/*
  the same varible can be used multiple times on the left hand side.  The right most 
  use of the variable will be the one it keeps.  this is useful for dumping unused variables.
*/
var a = [1,2,3]
var x;
[x,x,...a] = [ 0, ...a, 4 ];
// x=1, a=[ 2, 3, 4 ]

/*
  However, array destructing allows empty slots as throwaways.  This is the best way 
  to skip undesired positions in the source array.
*/
var a = [1,2,3];
[ , , ...a] = [ 0, ...a, 4 ];


// ----------------- nested array destructing --------------------
/*
  nested array destructing works just like array destructing.  If you wish to get inside 
  the inner array you mst provide an inner array destructuring.
  There is the added benifit of this self documenting the shape of the source array.
*/
var nested_foo = [ 1, 2, 3, [4,5,6]];

var a,b,c,d,e,f,g,h,rest;
[a,b,c,...rest] = nested_foo || [];
// a=1, b=2, c=3, args[[4,5,6]]
[a,b,c,[d,,e]] = nested_foo || [];
// a=1, b=2, c=3, d=4, e=6

/*
  to avoid a hard failure, it is best to deault the inner array destructures so if it 
  does not exist the variables get assigned undefined instead
*/
[a,b,c,[d,,e] = []] = nested_foo || [];
// a=1, b=2, c=3, d=4, e=6

// ---------------- object destructuring ----------------
/*
  Object destructuring behaves exactly as array destructuring except over an object.  
  Object variables can be stated explicit or inferred
*/

/*
  When explicitly stating which variable is to be assigned to which source object 
  variable the source is placed on the left of the `:` and the target is placed on 
  the right of the `:` operator
*/
var foo_object =  { a:1, b:2, c:3 d:4}
var { a:a, b:b, c:c } = foo_object;
// a=1, b=2, c=3

/*
  if the target and the source name are the same, you do not need to specify them twice, 
  the assignment is inferred by javascript
*/
var { a, b, c } = foo_object;
// a=1, b=2, c=3

/*
  explicit and inferred varibale assignment can exist in the same destructing
*/
var { a, b: x, c } = foo_object;

/*
  if the variables are defined eslewhere the statement must be wrapped in parens 
  to avoid the compiler confusing the object destructuring with a block creation
*/
var a,x,c;
({ a, b: x, c } = foo_object);
// a=1, x=2, c=3

//default are available
var a,x,c;
({ a = 10, x = 42, c } = foo_object;
// a=1, x=42, c=3

/*
  attempting object destructuring on something that is not an object fails.  it can 
  be gaurded against with an empty object
*/
({ a, b, c } = foo_null || {});

/*
  all properties do not need to be assigned from the source object.
*/
({ a, b } = foo_object || {});

/*
  extra variables get assigned will be assigned undefined (or defaulted) if the source 
  object does not have a variable of that identifier
*/
({ a, b, c ,d } = foo_object || {});

/*
  object spread and nested objects work exactly like the nested array destructuring.
  although not required, it is smart to provide defaults for the inner objects to avoid 
  a hard fail.
*/


// ------------function parameter array/object destructuing
/*
  array and object destructuring rules also exist inside the parameter list of functions.
  This is especially useful with object destructuring as it can be used to simulate the 
  'named arguments' feature many other languages have
*/

function param_destructuring( [a,b,c] = []) {}
param_destructuring( 1,2,3) // works but 1[0] is undefined
param_destructuring( [1,2,3] )

function named_params( {a = 10,b,c} = {}) {}
named_params({ c:3, b:2 })

