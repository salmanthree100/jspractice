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

