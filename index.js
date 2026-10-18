"use strict";

function passDown(param) {
  function getPass() {
    console.log(`${param} ${this.name} ${this.role}`);
    return `${param} ${this.name} ${this.role}`;
  }
  // Bind outer `this` directly to getPass
  return getPass.bind(this);
}

let info = { name: "Salman", role: "Developer" };
let caller = passDown.call(info, "Hello!");

caller(); // Output: Hello! Salman Developer

// let rawInfo = ["Salman", "Developer"];
// // let infoStr = rawInfo.toString();
// // console.log(infoStr);
// let sendInfo = passDown(rawInfo.join(", "))
// sendInfo()

function nester(param) {
  const rester = () => {
    console.log(`${param} ${this.name}, ${this.arr}`);
  };
  return rester;
}

let data = { name: "Tester", arr: ["Pokemon", "Doraemon"].join(", ") };
let applier = nester.apply(data, ["Chester", "Fester"]);
applier();
console.log(data.arr.length);

function wait(message) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, 1000);
  });
}

// Usage with async/await:
async function run() {
  const result = await wait("This a one second delay timer function");
  console.log(result); // Outputs after 1 second: This a one second delay timer function
}

run();

function outerPrint(num) {
  function inner() {
    for (let i = 0; i < num; i++) {
      console.log(i);
    }
  }
  return inner;
}

const runOuter = outerPrint(5);
runOuter();

function outerOperation(num) {
  function inner() {
    let result = 0;
    for (let i = 0; i < num; i++) {
      result += num;
      console.log(`Step ${i + 1}: ${result}`);
    }
    return result; // Return after the loop finishes
  }
  return inner;
}

const finalValue = outerOperation(5)();
console.log(`Final Return Value: ${finalValue}`);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function complex(num, message, callback) {
  return async function moreComplex() {
    for (let i = 0; i < num; i++) {
      console.log(i);
      callback(message);
      await delay(1000); // Pause for 1 second before the next iteration
    }
  };
}

// Invoke the returned function
complex(5, "Delay loop result", (result) => {
  console.log(result);
})();

// Impilict Binding
const frameworks = {
  name: "jQuery",
  getName() {
    console.log(this.name);
  },
};

frameworks.getName();

function provider(name) {
  function receiver() {
    return name;
  }
  return receiver;
}

var foo = (function CoolModule(id) {
  function change() {
    // modifying the public API
    publicAPI.identify = identify2;
  }
  function identify1() {
    console.log(id);
  }
  function identify2() {
    console.log(id.toUpperCase());
  }
  var publicAPI = {
    change: change,
    identify: identify1,
  };
  return publicAPI;
})("foo module");
foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE

// IIFE

const iife = (function (param) {
  console.log(param);
  return param;
})("I am an IIFE function!");

// function oldCompiler(param) {
//    function parser() {
//       console.log(`${this.name} ${this.framework}: ${param}`);
//       return `${this.name} ${this.framework}: ${param}`;
//    }
//    return parser.bind(this);
// }

// const lang1 = { name: "JavaScript", framework: "React" };
// const lang2 = { name: "PHP", framework: "Laravel" };

// const binder = oldCompiler.bind(lang1, "The most complex of them all is");
// const callBinder = binder();
// callBinder();

// const secondBinder = oldCompiler.bind(lang2, "This is another hard one the complexity of which is unknown as I have not experienced it yet personally.");
// const callSecondBinder = secondBinder()
// callSecondBinder();

// Arrow function currying: (param1) => (param2) => result
const compiler = (param1) => (param2) => {
  console.log(`Param 1: ${param1} | Param 2: ${param2}`);
  return `${param1} ${param2}`;
};

// Calling both arguments sequentially:
compiler("Hello")("World");
// Output: Param 1: Hello | Param 2: World

// Or storing the intermediate function:
const step1 = compiler("First");
step1("Second");
// Output: Param 1: First | Param 2: Second

// Method 2: Pure Multi-Level Parameter Currying Function
function oldCompiler(param1) {
  function parser(param2) {
    console.log(`${this.name} ${this.framework}: ${param1} ${param2}`);
  }
  return parser.bind(this);
}

const lang1 = { name: "JavaScript", framework: "React" };
const lang2 = { name: "PHP", framework: "Laravel" };

// Curried call chain: oldCompiler.bind(context, param1)()(param2)
oldCompiler.bind(lang1, "The most complex of them all is")()(
  "need to learn more",
);
oldCompiler.bind(lang2, "This is another hard one")()(
  "the complexity of which is unknown as I have not experienced it yet personally.",
);

// another approach
// Method 1: Currying with bind() (Partial Application + Binding)
// function oldCompiler(param1) {
//    function parser(param2) {
//       // Uses both param1 and param2
//       console.log(`${param1} -> ${param2}: ${this.name} (${this.framework})`);
//       return `${param1} ${param2} ${this.name} ${this.framework}`;
//    }
//    return parser.bind(this);
// }

// const lang1 = { name: "JavaScript", framework: "React" };
// const lang2 = { name: "PHP", framework: "Laravel" };

// // 1. First parameter ("The most complex...") passed via bind
// const binder = oldCompiler.bind(lang1, "The most complex of them all is");
// const callBinder = binder();

// // 2. Second parameter ("Frontend Stack") passed directly to parser()
// callBinder("Frontend Stack");

// // --- Second Example ---
// const secondBinder = oldCompiler.bind(
//    lang2,
//    "This is another hard one the complexity of which is unknown...",
// );
// const callSecondBinder = secondBinder();

// // Second parameter passed directly to parser()
// callSecondBinder("Backend Stack");

const someDetails = {
  identifier: function identity(param1, param2) {
    try {
      if (
        typeof this.person === typeof param1 &&
        typeof this.age === typeof param2
      ) {
        let msg = `${param1} ${param2}: data is in correct type`;
        return msg;
      } else {
        return `${param1} ${param2}: data is of incorrect type`;
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};

const details = { person: "Human", age: 24 };

const bindDetails = someDetails.identifier.bind(details);

console.log(bindDetails("Testing", 18));

// impilicit binding
const someObj = {
  id: 1,
  name: "Salman Aslam",
};

const moreInfo = {
  id: 2,
  name: "Farhan Aslam",
  getName() {
    console.log(this.name);
    return this.name | someObj.name;
  },
};

console.log(moreInfo.getName());

const obj1 = {
  id: 1,
  text: "Object 1",
};

const obj2 = {
  id: 2,
};

obj2.text = obj1.text;

console.log(obj2);
// Output: { id: 2, text: "Object 1" }

function opener(param) {
  function closer() {
    try {
      console.log("original param:", param);

      // Check condition -> `throw` transfers execution straight into `catch`
      /// Force type check or conversion
      if (typeof param !== "number" || Number.isNaN(param)) {
        throw new TypeError("Illegal Operation");
      }
      let result = param * 3;
      console.log("math result", result);
      return result;
    } catch (error) {
      // This block handles the error thrown above
      console.log("Error caught:", error.message);
      return error.message;
    }
  }
  return closer;
}

let callOpener = opener(25);
callOpener();

// const puller = async (message) => {
//    return new Promise((resolve) => {
//       setTimeout(() => {
//          resolve(message);
//       }, 3000);
//    });
// };

// const pullerMsg = await puller("This text will be showin in 3 seconds delay.");
// console.log(pullerMsg);

const jsObj = new Object();

jsObj.id = 101;
jsObj.name = "property defined";

Object.defineProperty(jsObj, "id", {
  value: 102,
  writable: true,
  configuarable: true,
  enumerable: true, // hides or show properties in loops
});

console.log(Object.getOwnPropertyDescriptor(jsObj, "id"));

delete jsObj.name;
console.log(jsObj);

const user = { name: "Salman" };

Object.defineProperty(user, "secretToken", {
  value: "xyz123",
  enumerable: false, // Hidden from loops
});

console.log(Object.keys(user));
// Output: ["name"]  (secretToken is omitted)

console.log(user.secretToken);
// Output: "xyz123" (Direct access still works)

const person = {};

Object.defineProperty(person, "role", {
  value: "Admin",
  configurable: false, // Locked configuration
});

try {
  delete person.role; // Fails!
  console.log(person.role); // Output: "Admin"
} catch (error) {
  console.log(error.message);
}

// Attempting to re-define descriptors throws TypeError:
// Object.defineProperty(person, "role", { enumerable: true }); // Error!

const myKeys = {
  id: 12,
  name: "first key",
  modifiable: false,
};

for (var k in myKeys) {
  console.log(k, myKeys[k]);
}

console.log(Object.keys(myKeys));

Object.defineProperty(myKeys, "modifiable", {
  value: true,
});

for (var k in myKeys) {
  console.log(k, myKeys[k]);
}

// duplicating objects sharing keys between objects
const store = {
  id: 20,
  name: "Store",
  getItem: function get() {
    return Object.assign(this.name, firstItem);
  },
};

const firstItem = {
  id: 22,
  name: "First item",
  sendItem: function send() {
    return this.name;
  },
};

console.log(store.getItem());
console.log(firstItem.sendItem());

for (var k in store) {
  console.log(k, store[k]);
}

const stringObj = store.getItem();

// for...of iterates over the string characters:
for (let char of stringObj) {
  console.log(char);
}

const audioSlave = {
  id: 1,
  singer: "Chris Cornell",
  songs: [
    { id: 1, name: "Like a stone", year: "2007" },
    { id: 2, name: "Shadow on the sun", year: "2004" },
    { id: 3, name: "Getaway car", year: "2006" },
    { id: 2, name: "Blackhole sun", year: "1994" },
  ],
};

const mapAudioSlave = audioSlave.songs.map((song) => song.name);

console.log(mapAudioSlave.join(", "));

for (let song of audioSlave.songs) {
  console.log(song.name);
}

for (let key in audioSlave) {
  console.log(key, audioSlave[key]);
}

for (let [key, val] of Object.entries(audioSlave)) {
  console.log(key, val);
}

const unity = {
  id: 1,
  name: "Unity Games",
};

const developers = {
  id: 2,
  name: "Ubisoft",
  getUnity() {
    return Object.assign(this.name, unity);
  },
};

console.log(developers.getUnity());

const loop = developers.getUnity();

for (let char of loop) {
  console.log(char);
}

const abc = {
  id: 1,
  name: "abc",
};

const proto = Object.create(abc);

console.log(proto.id, proto.name);

const child = Object.assign({}, abc);

console.log(child);

Object.defineProperty(child, "name", {
  value: "xyz",
});

console.log(Object.getOwnPropertyDescriptor(child, "name"));

// Usage of Object.defineProperties
// 1. Defining Standard Data Properties
const userObj = {};

Object.defineProperties(userObj, {
  firstName: {
    value: "Salman",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  lastName: {
    value: "Aslam",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  id: {
    value: 101,
    writable: false, // Read-only ID
    enumerable: false, // Hidden from loops/Object.keys
    configurable: false, // Cannot be deleted or reconfigured
  },
});

console.log(userObj.firstName); // "Salman"
console.log(Object.keys(userObj)); // ["firstName", "lastName"] (id is hidden)

try {
  userObj.id = 999; // Fails silently (or throws TypeError in strict mode)
  console.log(userObj.id); // 101
} catch (error) {
  console.log(error.message);
}

// 2. Defining Accessor Properties (Getters and Setters)
const cart = {
  _items: [],
};

Object.defineProperties(cart, {
  // Accessor Property: fullName getter & setter
  itemCount: {
    get() {
      return this._items.length;
    },
    enumerable: true,
    configurable: true,
  },
  addItem: {
    value(item) {
      this._items.push(item);
    },
    writable: false, // Cannot overwrite the method reference
    enumerable: false, // Hide the method from property lists
    configurable: true,
  },
});

cart.addItem("Book");
cart.addItem("Pen");

console.log(cart.itemCount); // 2

// 3. Cloning Objects with Exact Descriptors
const original = {
  _value: 10,
  get doubled() {
    return this._value * 2;
  },
  set doubled(val) {
    this._value = val / 2;
  },
};

// Copy descriptors to trueCopy
const trueCopy = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(original),
);

// 1. Using the getter:
console.log(trueCopy.doubled); // 20

// 2. Using the setter on trueCopy:
trueCopy.doubled = 100;

console.log(trueCopy._value); // 50
console.log(trueCopy.doubled); // 100

// without setter the code above would fix like this
const yolo = {
  _value: 10,
  get doubled() {
    return this._value * 2;
  },
};

// ❌ Object.assign flattens 'doubled' into a static number (20):
const assignCopy = Object.assign({}, yolo);
yolo._value = 50;
console.log(assignCopy.doubled); // Still 20 (lost getter functionality)

//  Object.defineProperties preserves the getter:
const yoloCopy = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(yolo),
);

yolo._value = 50;
console.log(yoloCopy.doubled); // 100 (getter was properly preserved!)

const aliceInChains = {
  id: 201,
  singer: "Layne Staley",
  getSongs: function getAliceSongs() {
    const assignObj = Object.assign({}, aliceSongs);
    const mapAssignObj = assignObj.songsList.map((song) => song.name);
    return `These songs: ${mapAssignObj.join(", ")} are all great by the singer ${this.singer}`;
    // Alternative: Pure Loop with Object.entries() (No .map() at all)
    // const songNames = [];
    // for (const [index, song] of Object.entries(assignObj.songsList)) {
    //    songNames.push(song.name);
    // }
    ``;
    // return `These songs: ${songNames.join(", ")} are all great by the singer ${this.singer}`;
  },
};

const aliceSongs = {
  id: 210,
  songsList: [
    { id: 300, name: "Would", year: "1992" },
    { id: 301, name: "Nutshell", year: "1994" },
    { id: 302, name: "Man in the Box", year: "1990" },
    { id: 303, name: "Down in a hole", year: "1992" },
  ],
};

console.log(aliceInChains.getSongs());

// nullish coalescing operator

let mambo = "Kid";
let jambo;

let mamboJambo = mambo ?? jambo;

console.log(mamboJambo);

const ask = (question, yes, no) => {
  try {
    if (confirm(question)) yes();
    else no();
  } catch (error) {
    console.log(error.message);
  }
};

ask(
  "Are you dumb?",
  () => console.log("You agreed."),
  () => console.log("You disagreed."),
);

camelize;

function camelize(str) {
  return str
    .split("-") // splits 'my-long-word' into array ['my', 'long', 'word']
    .map(
      // capitalizes first letters of all array items except the first one
      // converts ['my', 'long', 'word'] into ['my', 'Long', 'Word']
      (word, index) =>
        index == 0 ? word : word[0].toUpperCase() + word.slice(1),
    )
    .join(""); // joins ['my', 'Long', 'Word'] into 'myLongWord'
}

console.log(camelize("dumb-bitch-be-sayin"));

// Remove duplicates
function removeDuplicates(...array) {
  // rest operator used in to pass array as parameter
  console.log(array.filter((a, b) => array.indexOf(a) === b).join("\n"));
  return array.filter((a, b) => array.indexOf(a) === b).join("\n");
}

removeDuplicates(
  "salman",
  "farhan",
  "salman",
  "fidan",
  "turkey",
  "jiggly",
  "turkey",
);

// filter range

function filterRange(arr, a, b) {
  // added brackets around the expression for better readability
  return arr.filter((item) => a <= item && item <= b);
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

console.log(filtered); // 3,1 (matching values)

console.log(arr); // 5,3,8,1 (not modified)

let arrStr = ["HTML", "JavaScript", "CSS"];

function copySorted(arrStr) {
  let copyArrStr = [...arrStr]; // used spread operator to copy the array values
  return copyArrStr.sort((a, b) => (a > b ? 1 : -1));
}

let sorted = copySorted(arrStr);

console.log(sorted); // CSS, HTML, JavaScript
console.log(arrStr); // HTML, JavaScript, CSS (no changes)

const str = "3 + 7";
const [a, b] = str.split("+").map(Number);

const add = a + b;

console.log(typeof add); // number
console.log(add); // 10

// replace array in JSON.stringify method

const userMe = {
  id: 101,
  name: "Salman",
  age: 25,
  role: "Developer",
  passwordHash: "secret_abc123",
};

// Only stringify 'name' and 'role'
const replacer = ["name", "role"];

const userString = JSON.stringify(userMe, replacer);

console.log(userString);
// Output: '{"name":"Salman","role":"Developer"}'

// The replacer array works recursively.
// If your target object contains nested objects,
// properties matching any string in the replacer array
// will be included at all nesting levels:

const company = {
  name: "TechCorp",
  location: "Karachi",
  details: {
    name: "Headquarters", // Property name 'name' matches the array
    employees: 150,
  },
};

const companyString = JSON.stringify(company, ["name", "details"]);

console.log(companyString);
// Output: '{"name":"TechCorp","details":{"name":"Headquarters"}}'

// Replace function in JSON.stringify

const sameUser = { name: "Salman" };

JSON.stringify(sameUser, (key, value) => {
  console.log(`Key: "${key}"`, value);
  return value;
});

// Logs:
// Key: "" { name: 'Salman' }  <-- Initial root call!
// Key: "name" Salman

// 1. Filtering Properties (Returning undefined)
const anotherUser = {
  id: 101,
  name: "Salman",
  passwordHash: "secret_12345",
  creditCard: "4111-xxxx-xxxx-1111",
};

const anotherUserString = JSON.stringify(anotherUser, (key, value) => {
  // Strip sensitive fields
  if (key === "passwordHash" || key === "creditCard") {
    return undefined; // Excludes property from output
  }
  return value;
});

console.log(anotherUserString);
// Output: '{"id":101,"name":"Salman"}'

// 2. Transforming Values Dynamically

const item = {
  name: "Laptop",
  price: 1200,
  tags: ["electronics", "tech"],
  isAvailable: true,
};

const jsonString = JSON.stringify(item, (key, value) => {
  // Uppercase all string values
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  // Double all numbers
  if (typeof value === "number") {
    return value * 2;
  }
  return value;
});

console.log(jsonString);
// Output: '{"name":"LAPTOP","price":2400,"tags":["ELECTRONICS","TECH"],"isAvailable":true}'

// 3. Handling Unstringifiable Types (BigInt, Map, Set)
const state = {
  bigId: 9007199254740991n, // BigInt
  uniqueTags: new Set(["js", "node"]),
};

const unstrString = JSON.stringify(state, (key, value) => {
  // Convert BigInt to string to avoid TypeError
  if (typeof value === "bigint") {
    return value.toString();
  }
  // Convert Set to Array
  if (value instanceof Set) {
    return Array.from(value);
  }
  return value;
});

console.log(unstrString);
// Output: '{"bigId":"9007199254740991","uniqueTags":["js","node"]}'

let room = {
  number: 23,
};

let meetup = {
  title: "Conference",
  occupiedBy: [{ name: "John" }, { name: "Alice" }],
  place: room,
};

// Circular references
room.occupiedBy = meetup;
meetup.self = meetup;

console.log(
  JSON.stringify(meetup, function replacer(key, value) {
    // 1. Remove 'self'
    if (key === "self") {
      return undefined;
    }

    // 2. Remove 'occupiedBy' ONLY if it belongs to 'room' (this === room)
    if (key === "occupiedBy" && this === room) {
      return undefined;
    }

    return value;
  }),
);

/* result should be:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/

// Recursion
// Task 1:
// Sum all numbers till the given one

function sumTo(n) {
  if (n == 1) {
    return n;
  } else {
    return n + sumTo(n - 1);
  }
}

console.log(sumTo(100)); // 5050

// using for loop
function sumToLoop(n) {
  let result = 0;

  for (let i = 1; i <= n; i++) {
    result += i;
  }

  return result;
}

console.log(sumToLoop(100)); // 5050

// using arthimetic progression
function sumToArProg(n) {
  return (n * (n + 1)) / 2;
}

console.log(sumToArProg(100));

// Calculate factorial
// using recursion
function factorial(n) {
  return n != 1 ? n * factorial(n - 1) : 1;
}

console.log(factorial(5)); // 120

// using for loop
function factorialLoop(n) {
  let result = 1;
  for (let i = n; i > 0; i--) {
    result *= i;
  }

  return result;
}

console.log(factorialLoop(5));

// Performance test which run faster loop vs recursion
function benchmark(fn, input, iterations = 1_000_000) {
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    fn(input);
  }

  const end = performance.now();
  return (end - start).toFixed(2); // Time in milliseconds
}

// Pass a larger value like 100 to make the difference noticeable
console.log(`Recursive factorial: ${benchmark(factorial, 100)} ms`);
console.log(`Loop factorial:      ${benchmark(factorialLoop, 100)} ms`);

// Output a single-linked list
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

function getArbitraryDepth(list) {
  if (list === null || typeof list !== "object") return 0;

  let keys = Object.keys(list);
  if (keys.length === 0) return 1; // Empty object still counts as 1 level

  // Find the deepest path among all keys
  return 1 + Math.max(...keys.map((key) => getArbitraryDepth(list[key])));
}

console.log(getArbitraryDepth(list));

function printList(list) {
  while (list) {
    console.log(list.value);
    list = list.next;
  }
}

console.log(printList(list));

function* generator(name) {
  const nextName = yield name;
  yield nextName;
}

let it = generator("Salman");

console.log(it.next().value);
console.log(it.next("Farhan").value);
console.log(it.next().value);

function* pauseTimeOut(time) {
  const result = yield setTimeout(() => {}, 1000);
  return result; // or yield result
}

let itPause = pauseTimeOut(200);

itPause.next(); // Yields the Timeout object
console.log(itPause.next(250).value); // Yields 250!

function delayTimer(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Using async/await (built on top of generator concepts)
async function pauseDelayTimer(time) {
  await delayTimer(time);
  return time;
}

pauseDelayTimer(1000).then(console.log);

function* random(names) {
  for (let name of names) {
    yield name;
  }
}

let randomGen = random(["Tom", "Dick", "Harry"]);

for (let value of randomGen) {
  console.log(value);
}

const iteratorObj = {
  from: 100,
  to: 500,

  *[Symbol.iterator]() {
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};

console.log([...iteratorObj]);

// difference between excecution
// of async geerator function
// and async regular funcion
async function regularAsyncFetch(url) {
  let response = await fetch(url);
  let result = await response.json();
  return result;
}

// Non-generator async function
console.log(regularAsyncFetch("https://dummyjson.com/posts"));
// Output: Promise { <pending> }

async function regularDataConsume() {
  let posts = await regularAsyncFetch("https://dummyjson.com/posts");
  // 2. Builds all 100 post objects in memory at once
  for (let post of posts.posts) {
    if (post.id > 2) break; // Stops printing, but full array was already allocated in memory
    console.log(post.title);
  }
}

regularDataConsume();

// 1. Convert to an Async Generator function (async function*)
async function* asyncGenFetch(url) {
  let response = await fetch(url);
  let result = await response.json();

  // Yield each post individually
  for (let post of result.posts) {
    yield post;
  }
}

// Async generator function
console.log(asyncGenFetch("https://dummyjson.com/posts"));
// Output: AsyncGenerator { <pending> }

async function generatorDataConsume() {
  for await (let post of asyncGenFetch("https://dummyjson.com/posts")) {
    if (post.id > 2) break; // 3. Calling 'break' cancels/closes the generator immediately!
    console.log(post.title);
  }
}

generatorDataConsume();

async function* dataCombo(url1, url2) {
  // 1. Fetch both URLs in parallel
  const [res1, res2] = await Promise.all([fetch(url1), fetch(url2)]);

  // 2. Parse both JSON responses separately
  const result1 = await res1.json();
  const result2 = await res2.json();

  // 3. Yield posts individually
  for (let post of result1.posts) {
    yield post;
  }

  // 4. Yield comments individually
  for (let comment of result2.comments) {
    yield comment;
  }
}

async function comboConsumer() {
  for await (let item of dataCombo(
    "https://dummyjson.com/posts",
    "https://dummyjson.com/comments",
  )) {
    // Note: Comments might have body instead of title, or different property structure
    if (item.id > 2) break; // Closes generator early!
    console.log(item.title || item.body);
  }
}

comboConsumer();

async function* dataCombo(url1, url2) {
  const [res1, res2] = await Promise.all([fetch(url1), fetch(url2)]);
  const [result1, result2] = await Promise.all([res1.json(), res2.json()]);

  yield* result1.posts; // Streams all posts
  yield* result2.comments; // Streams all comments
}

// edabit challenges
// First Class, Second Class and Third Class Levers
function determineLever(array) {
  let str = array.join("");
  return str.charAt(0) == "f"
    ? "third class lever"
    : str.charAt(2) == "f"
      ? "second class lever"
      : str.charAt(1) == "f"
        ? "first class lever"
        : null;
}

console.log(determineLever(["e", "f", "l"])); // "first class lever"

console.log(determineLever(["e", "l", "f"])); // "second class lever"

console.log(determineLever(["f", "e", "l"])); // "third class lever"

// Chinese Zodiac

function chineseZodiac(birthYear) {
  const remainder = (birthYear - 4) % 12;

  switch (remainder) {
    case 0:
      return "Rat";
    case 1:
      return "Ox";
    case 2:
      return "Tiger";
    case 3:
      return "Rabbit";
    case 4:
      return "Dragon";
    case 5:
      return "Snake";
    case 6:
      return "Horse";
    case 7:
      return "Sheep";
    case 8:
      return "Monkey";
    case 9:
      return "Rooster";
    case 10:
      return "Dog";
    case 11:
      return "Pig";
  }
}

console.log(chineseZodiac(2021)); //➞ "Ox"

console.log(chineseZodiac(2020)); //➞ "Rat"

console.log(chineseZodiac(1933)); //➞ "Rooster"

// Rotate for Max Number
function rotateMaxNumber(number) {
  let numStr = String(number).split("");
  let result = numStr.sort((a, b) => b - a);
  console.log(Number(result.join("")));
  return Number(result.join(""));
}

rotateMaxNumber(123); //➞ 321

rotateMaxNumber("001"); //➞ 100

rotateMaxNumber(999); //➞ 999

// Narcissistic Number
function isNarcissistic(narc) {
  let narcStr = String(narc).split("");
  let total = narcStr.reduce(
    (acc, elem) => Number(elem ** narcStr.length) + acc,
    0,
  );
  return total == narc;
}

console.log(isNarcissistic(153)); //➞ true

console.log(isNarcissistic(370)); //➞ true

console.log(isNarcissistic(1652)); //➞ false

// Less Than 100 Array Remix
function arrayLessThan100(numArr) {
  let total = numArr.reduce((acc, curr) => acc + curr, 0);
  return total < 100;
}

console.log(arrayLessThan100([5, 57])); //➞ true

console.log(arrayLessThan100([77, 30])); //➞ false

console.log(arrayLessThan100([0])); //➞ true

// Cowboy Shootout
function rogerShots(arrShots) {
  let filterShots = arrShots.filter(
    (item) => item == "Bang!" || item == "BangBang!",
  );
  console.log(filterShots.length * 0.5);
  return filterShots.length * 0.5;
}

rogerShots(["Bang!", "Bang!", "Bang!", "Bang!", "Bang!", "Bang!"]); //➞ 3

rogerShots(["Bang!", "Bang!", "Bang!", "Bang!", "BangBang!"]); //➞ 2.5

rogerShots([
  "Bang!",
  "BangBangBang!",
  "Boom!",
  "Bang!",
  "BangBang!",
  "BangBang!",
]); //➞ 2

// Keep the Newer Update
function newerValue(first, second) {
  return first[0] > second[0]
    ? first[1]
    : first[0] == second[0]
      ? first[1]
      : second[1];
}

console.log(newerValue([10, "ready"], [12, "busy"])); // "busy"

console.log(newerValue([20, "online"], [15, "offline"])); // "online"

console.log(newerValue([5, "first"], [5, "second"])); // "first"

// Can This Meeting Fit?
function meetingFits(available, meeting) {
  // Write your code here.
  let [start1, end1] = available;
  let [start2, end2] = meeting;
  return start2 >= start1 && end2 <= end1 ? true : false;
}

console.log(meetingFits([9, 12], [10, 11])); // true

console.log(meetingFits([9, 12], [8, 10])); // false

console.log(meetingFits([9, 12], [9, 12])); // true

// One Search Step
function searchStep(numbers, position, target) {
  // Write your code here.
  return numbers[position] == target
    ? "found"
    : numbers[position] < target
      ? "right"
      : numbers[position] > target
        ? "left"
        : "";
}

console.log(searchStep([2, 5, 8], 1, 5)); // "found"

console.log(searchStep([2, 5, 8], 1, 3)); // "left"

console.log(searchStep([2, 5, 8], 1, 9)); // "right"

// Will the Next File Fit?
function fileFits(capacity, used, size) {
  return used + size <= capacity;
}

console.log(fileFits(100, 70, 20)); // true

console.log(fileFits(100, 70, 31)); // false

console.log(fileFits(100, 70, 30)); // true

// Count the Arguments
function numArgs(...arg) {
  return arg.length;
}

// Find Out the Leap Year
function leapYear(year) {
  return year % 4 == 0 || year % 400 == 0;
}

// End Corona!
function endCorona(recovers, newCases, activeCases) {
  return Math.ceil(activeCases / (recovers - newCases));
}

endCorona(4000, 2000, 77000); //➞ 39

endCorona(3000, 2000, 50699); //➞ 51

endCorona(30000, 25000, 390205); //➞ 79

// Does the Next Score Keep Order?
function keepsOrder(scores, next_score) {
  if (scores.length == 0) return true;
  console.log("log scores last item:", scores.at(-1));
  return scores.at(-1) <= next_score;
}

console.log(keepsOrder([2, 5, 5], 4)); // false

console.log(keepsOrder([2, 5, 5], 5)); // true

console.log(keepsOrder([], -3)); // true

// Find the Last Failed Check
function lastFailedCheck(results) {
  console.log(
    "fail log line 1333:",
    results.includes("fail") ? results.lastIndexOf("fail") : -1,
  );
  return results.includes("fail") ? results.lastIndexOf("fail") : -1;
}

lastFailedCheck(["pass", "fail", "pass", "fail"]); // 3

lastFailedCheck(["pass", "pass"]); // -1

lastFailedCheck(["fail", "pass"]); // 0

// Stop at Cancel

