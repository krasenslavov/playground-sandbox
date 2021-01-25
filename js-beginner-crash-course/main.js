// let, const
// String, Number, Boolean, null, undefined, symbol
const name = "John";
const age = 30;
// String Concatenation
console.log("My name is " + name + " and I am " + age);
console.log(`My name is ${name} and I am ${age}`);
// String Functions
const s = "Hello World!";
console.log(s.length);
console.log(s.toLowerCase());
console.log(s.toUpperCase());
console.log(s.substring(0, 5).toUpperCase);
console.log(s.split(" "));

// Arrays + Functions
const number = new Array(1, 2, 3, 4, 5);
const fruits = ["apples", "oranges", "bananas"];
console.log(fruits[1]);
fruits[3] = "grapes";
fruits.push("mangos");
fruits.unshift("strawberries");
fruits.pop();
console.log(fruits);
console.log(Array.isArray(fruits));
console.log(fruits.indexOf("oranges"));

// Object Literals
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  hobbies: ["soccer", "music", "movies"],
  address: {
    street: "123 Main Street",
    city: "Lyon",
    country: "France",
  },
};
console.log(person);
console.log(person.address.city);
const {
  firstName,
  lastName,
  address: { city },
} = person; // desructuring
console.log(firstName);
console.log(city);
person.email = "john@email.com";
console.log(person);

// Todos
const todos = [
  {
    id: 1,
    text: "Take out the trash",
    isCompleted: true,
  },
  {
    id: 2,
    text: "Meeting with boss",
    isCompleted: true,
  },
  {
    id: 3,
    text: "Denstist appointment",
    isCompleted: false,
  },
];
console.log(todos[1].text);
const todoJSON = JSON.stringify(todos);
console.log(todoJSON);

// Loops
for (let i = 0; i < 10; i++) {
  // for
  console.log(`For loop number: ${i}`);
}

let i = 0;
while (i < 10) {
  // while
  console.log(`While loop number: ${i}`);
  i++;
}

for (let i = 0; i < todos.length; i++) {
  // for with Array
  console.log(`${todos[i].text}`);
}

for (let todo of todos) {
  // for ... of
  console.log(todo.text);
}

todos.forEach(function (todo) {
  // forEach
  console.log(todo.text);
});

const todoText = todos.map(function (todo) {
  // map
  return todo.text;
});
console.log(todoText);

const todoCompleted = todos
  .filter(function (todo) {
    // filter
    return todo.isCompleted === true;
  })
  .map(function (todo) {
    // chain loops
    return todo.text;
  });
console.log(todoCompleted);

// Conditionals

// const x = 10;
const x = "10";
const y = 20;

if (x === 10) {
  console.log("x is 10");
} else if (x > 10) {
  console.log("x is greater than 10");
} else {
  console.log("x is less than 10");
}

if (x > 10 || y > 20) {
  // if (x > 10 && y > 20) {
  console.log("x is more than 5 and y is more than 10");
}

const z = 10;
const color = z > 10 ? "red" : "blue";
console.log(color);

switch (color) {
  case "red":
    console.log("color is red");
    break;
  case "blue":
    console.log("color is blue");
    break;
  default:
    console.log("color is not red or blue");
}

// Functions
function addNums(n1 = 0, n2 = 5) {
  return n1 + n2;
}
console.log(addNums(1 + 1));

const addNumsArr = (n1 = 0, n2 = 5) => {
  // arrow function
  return n1 + n2;
};
console.log(addNumsArr(1 + 1));

todos.forEach((todo) => console.log(todo));

// OOP
function Person(firstName, lastName, dob) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.dob = new Date(dob);
  // this.getBirthYear = function () {
  //   return this.dob.getFullYear();
  // };
  // this.getFullName = function () {
  //   return `${this.firstName} ${this.lastName}`;
  // };
}

// Prototypes
Person.prototype.getBirthYear = function () {
  return this.dob.getFullYear();
};

Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

// Instantiate object
const person1 = new Person("John", "Doe", "12/8/1981");
const person2 = new Person("Mary", "Smith", "4/8/1999");
console.log(person1, person2);
console.log(person2.dob, person2.dob.getFullYear());
console.log(person1.getBirthYear());
console.log(person2.getFullName());

// ES6 (do the same as prototype w/ Class)
class Person1 {
  constructor(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = new Date(dob);
  }

  getBirthYear() {
    return this.dob.getFullYear();
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// DOM
// console.log(window, window.alert(1));
// alert(2);

// Single selector
const form = document.getElementById("my-form");
console.log(form);
console.log(document.querySelector("h1"));

// Multiple selectors
const items = document.querySelectorAll(".item");
// console.log(document.getElementsByClassName("item"));
// console.log(document.getElementsByTagName("li"));
items.forEach((item) => console.log(item));

const ul = document.querySelector(".items");
// ul.remove();
// ul.lastElementChild.remove();
// ul.firstElementChild.textContent = "Hello";
// ul.children[1].innerText = "World";
// ul.lastElementChild.innerHTML = "<h1>Welcome</h1>";

const btn = document.querySelector(".btn");
btn.style.background = "red";

// Events
// btn.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(e.target, e.target.className);
//   document.querySelector("#my-form").style.background = "#ccc";
//   document.querySelector("body").classList.add("bg-dark");
//   document.querySelector(".items").lastElementChild.innerHTML =
//   ("<h1>Hello!</h1>");
// });

// Sample DOM app
const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

myForm.addEventListener("submit", onSubmit);
function onSubmit(e) {
  e.preventDefault();
  if (nameInput.value === "" || emailInput.value === "") {
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields";
    setTimeout(() => msg.remove(), 3000);
  } else {
    const li = document.createElement("li");
    li.appendChild(
      document.createTextNode(`${nameInput.value} : ${emailInput.value}`)
    );
    userList.appendChild(li);
    nameInput.value = "";
    emailInput.value = "";
  }
}
