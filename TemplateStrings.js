/*
  Template strings allow you to write verbatim what you wish a string to look 
  like as well as inject values into the string.

  dispite its name as template, these are not 'reusable',  they are executed 
  once and saved immediatle as a string.  the markup is only used as a means to 
  write the string.  a better name is 'interpolated string literal'
*/

var name = 'Ryan';
var orderNumber = '123';
var total = 319.7;

var msg = `Hello ${name}, your order (#${orderNumber}) was $${total}.`;
// Hello Ryan, your order (#123) was $319.7.

/*
  newlines incorporated into the string in the editor are honored and preserved 
  in the construction of the string.
*/
var msg = `Hello ${name}, your order 
(#${orderNumber}) was $${total}.`;
// Hello Ryan, your order
// (#123) was $319.7.

/*
  newlines incorporated into the string in the editor can however be escaped 
  with a `\`.  during the construction of the string there will not be a new 
  line there.
*/
var msg = `Hello ${name}, your order \
(#${orderNumber}) was $${total}.`;
// Hello Ryan, your order (#123) was $319.7.

/*
  any valid javascript expression can be places inside the ${}, including 
  nested string templates 
*/
var tax = 0.035;
var msg = `Hello ${name}, your order \
(#${orderNumber}) was $${total * (1 + tax)}.`;
// Hello Ryan, your order (#123) was $330.88949999999994.

/*
  template functions can be passed a 'tag'. a tag function is a method that 
  acts as a preprocessor to the string template.  

  Its parameters are a list of `strings` and the values injected into the 
  string template(usually gathered with a `...` operator).  There will always 
  be 1 more in the `strings` array than the `values` array.

  Although technically a tag function can technically disregard the parameters 
  passed in and return any string it wants, it is discouraged.
*/
var name = 'Ryan';
var orderNumber = '123';
var total = 319.7;

function currency(strings, ...values) {
  /*
   strings param is an array of all the string values
   ['Hello ',
   ', your order (#',
   ') was $', 
   '.']
  */
  /*
    by default all the values are passed in as individual parameters after 
    `strings`.
    'value1,value2,value3,value4'
    so most people gather them with the `...` operator into an `values` array
    ["Ryan",
    "123",
    319.7
    ]
  */

  //constructs the string and formats any number to have 2 decimal places
  var str = '';
  for (var i = 0; i < strings.length; i++) {
    if (i > 0) {
      if (typeof values[i - 1] == 'number') {
        str += values[i - 1].toFixed(2);
      } else {
        str += values[i - 1];
      }
    }
    str += strings[i];
  }

  return str || 'Anything I want really.';
}

var msg = currency`Hello ${name}, your\
 order (#${orderNumber}) was $${total * (1 + tax)}.`;
// Hello Ryan, your order (#123) was $330.88.
