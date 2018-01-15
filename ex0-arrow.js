(function IIFE() {
  function foo(x) {
    var y = x * 2;

    var baz = (baz, v) => {
      if (v > 3) return v + y;
      else return baz(baz, v * 4);
    };

    return function bar(z) {
      if (z.length > 3) {
        return z.map(v => baz(baz, v));
      } else {
        var obj = [];

        setTimeout(() => {
          obj.length = 1;
          obj[0] = this.w;
        }, 100);

        return obj;
      }
    };
  }

  var p = foo(2);
  var list1 = [1, 3, 4];
  var list2 = list1.concat(6);

  list1 = p.call({ w: 42 }, list1);
  list2 = p(list2);

  setTimeout(function() {
    console.log(
      list1[0] ===
        list2.reduce(function(s, v) {
          return s + v;
        }, 0)
    );
  }, 200);
})();
