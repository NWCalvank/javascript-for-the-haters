const {nums} = require('./data');
const {curry, Z} = require('./util');

// console.log(nums);

// Parametric Polymorphism
const plus = (a, b) => a + b;

// console.log(plus(2, 3));
// console.log(plus('Nat', 'han'));

// Custom Data types
const myCollection = {
  // Property
  values: [],
  // Method
  blah: () => {
    console.log('blah!!');
  },
  // Instance methods
  of: function(...values) {
    const newInstance = Object.create(this);
    newInstance.values = values;
    return newInstance;
  },
  map: function(fn) {
    const newValues = this.values.map(fn);
    return this.of(...newValues);
  },
};

// myCollection.blah();

// Ad hoc polymorphism
const map = (fn, context) => context.map(fn);
// console.log(map(x => x + 1, [1, 2, 3]));
// console.log(map(x => x + 1, myCollection.of(5, 6, 7)));

// Manual Currying
const add = x => y => x + y;

// Partially-applied add with a closure over x = 1
const add1 = add(1);

// console.log(map(add1, [1, 2, 3]));

// With curry helper
const addTogether = (x, y, z, optional = 0) => x + y + z + optional;

// console.log(curry(addTogether)(30)(8)(4));
// console.log(curry(addTogether, 4)(30)(8)(4)(8));

// Inheritance
const person = {species: 'Human', speak: () => "I'm a person"};
const me = Object.create(person);
// Has no properties of its own
// console.log(me);
// Delegation up prototype chain to myCollection
// console.log(me.speak());
// Overwrite instance property
me.name = 'Nathan';
me.favAnimal = 'Penguin';
// console.log(me);
// console.log(me.species);

// Copy of all own properties and break prototype chain
const meCopy = Object.assign({}, me);
// meCopy has no species on the prototype chain
// console.log(meCopy);
// console.log(meCopy.species);

// Recursion
const sum = ([x = 0, y = 0, ...rest] = []) =>
  rest.length === 0 ? x + y : sum([x + y, ...rest]);

// console.log(sum(nums));
// console.log(sum([]));
// console.log(sum());

// Reduce to abstract away the recursion
// console.log(nums.reduce((x, y) => x + y, 0));

// Reduce for simple composition
const compose = (...funcs) => x => funcs.reduceRight((val, f) => f(val), x);

const doubleThenAdd10 = compose(
  add(10),
  x => x * 2,
);
// console.log(map(doubleThenAdd10, nums));

// Anonymous recursion with the Z combinator just cuz we can
const total = (f => (x => x(x))(x => f(y => x(x)(y))))(
  f => ([x = 0, y = 0, ...rest]) =>
    rest.length === 0 ? x + y : f([x + y, ...rest]),
)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// console.log(total);

// Same thing using variables
const sumGen = f => ([x = 0, y = 0, ...rest]) =>
  rest.length === 0 ? x + y : f([x + y, ...rest]);
const result = Z(sumGen)(nums);
// console.log(result);
