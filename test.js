const K = a => b => a;

let a = "A";
let b = "B";

a = K(b)(b = a)

console.log(a);
console.log(b);