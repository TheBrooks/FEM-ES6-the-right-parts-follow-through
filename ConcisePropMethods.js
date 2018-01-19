/*
  when declairing properties on an object, a short hand 
  notation called 'concise' properties can be used in the 
  case where the property name and the name of the variable 
  it is coming from are the same.  When this is true it 
  only needs to be listed once in the object.

*/
var a = 1;
var obj = {
  a
}
// obj={ a: 1 }

/*
  when declaring a method, a concise format can also be 
  used.  The concise method however has some drawback 
  though as it does not get the name of the label, it is 
  instead an anonymous function.  

  This means there is no lexical self reference that can be 
  used inside the method if recusion is needed or unbinding 
  of handlers.  The reason there is no generated lexical 
  self reference is because it is possible to make a 
  concise method name that cannot be a lexical identifier

  if an exception is thrown and this method is in the stack 
  name inferencing will name the method as its label, but 
  this is only a debugging covienence and not its actual 
  callable method name.
*/
var obj = {
  a: function() { /* previous anonymous method */ },
  b() { /*
    concise anonymous method.
    shows up as 'b' on the stack trace.
    No lexican self refernce.
    */ },
  "no lexical"() { /*
    the javascript consortium could not come up with a rule 
    to turn any propertyname into a valid lexical 
    identifier so the rule is that there is no lexical self 
    identifier on concise methods.
    */ }
}

/*
  property and method names, includeing generators, can be 
  computed if the expression is placed inside a '[]'.
*/
var c = "hello";
var obj = {
  a,
  b() {},
  [c.toUperCase]: 'computer property name'
  [c+"fn"]() { console.log("computed method name")},
  *gen(){ 
    for(var i=0;i<2;i++){
      console.log('computer generator name');
      yield i;
    }
  },
  *[c+'gen'](){
    for(var i=0;i<2;i++){
      console.log('computer concise generator name');
      yield i;
    }
  } 
}





