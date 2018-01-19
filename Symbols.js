/*
  Symbols are unique unguessable values that are unique to your program.
  Symbols must be created with the function call and cannot be `new`d.
*/
var x = Symbol();
// x=Symbol()

/*
  Symbols take one optional 'name' parameter.  this value is a label that is 
  only used for debugging and does not affect the underlying unguessable value  
  of the Symbol.
*/
var x = Symbol( "whatever description you want" )
// x=Symbol(whatevery descriptio you want)

/*
  The description does not have to be unique to make unique Symbols.  Every 
  Symbol created is unique regardless of description.  No two Symbols will ever 
  be equal.  Though it would be dumb to give two Symbols the same description 
  as it would make debugging challanging.
*/

var a = Symbol("nonunique");
var b = Symbol("nonunique");
a !== b;


/*
  Symbols can be used as obj porperty and method identifiers.  When a Symbol is 
  used in an object property or method identifier it group seperately that the 
  other property names but it is not secret or hidden.  It is placed in a 
  seperate bucket with all the other Symbols on that object and can be 
  acceessed by `getOwnPropertySymbols()`.  Usually however, it is a good 
  indication that if the property identifier is a Symbol it is meant to be left 
  alone.
*/
var x = Symbol("description");
var obj = {
  id: 42
  [x]: 'secret'
};
var y;
y = obj[x];
// y='secret'

y = obj;
// obj={ id: 42, Symbol(description): "secret" }

y = obj.keys;
// y=["id"]

y = Object.getOwnPropertyNames(obj);
// y=["id"]

y = Object.getOwnPropertySymbols(obj); 
// y=[Symbol(description)]


/*
  javascript comes with many well known symbol properties that are on the 
  symbol function object.  
*/
Symbol.iterator
Symbol.toStringTag
Symbol.toPrimative
Symbol.isConcatSpreadable
// ..

// meta extenion hooks