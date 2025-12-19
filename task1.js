//Написати програму, яка виводить числа від 1 до 10, використовуючи цикли for і while.

console.log("for loop:");

for (let i = 1; i <= 10; i++) {
  console.log(i);
}

console.log("\nwhile loop:");

let i = 1;

while (i <= 10) {
  console.log(i);
  i++;
}

/*Створити масив, що складається з елементів різних типів (примітивів) (число, рядок, булева змінна) довжиною 10 елементів. 
Вивести їх тип за допомогою typeof у консоль. Виведення здійсніть за допомогою перебору масиву різними способами: методом forEach, циклами for, while і do while.*/

const arr = [10, "hello", true, 3.14, false, "boolean", 0, "123", true, -5];

console.log("\nforEach method:");

arr.forEach((item) => {
  console.log(typeof item);
});

console.log("\nfor loop:");

for (let i = 0; i < arr.length; i++) {
  console.log(typeof arr[i]);
}

console.log("\nwhile loop:");

i = 0;

while (i < arr.length) {
  console.log(typeof arr[i]);
  i++;
}

console.log("\ndo while loop:");

i = 0;

do {
  console.log(typeof arr[i]);
  i++;
} while (i < arr.length);

//Створити масив об'єктів (приклад об'єкта {name: ‘’, age: xx, pets: [cat, dog]}) і використати метод filter, щоб вивести всіх, кому більше 20 років.

const people = [
  { name: "Oleh", age: 21, pets: ["dog", "cat"] },
  { name: "Anna", age: 19, pets: ["cat", "rabbit"] },
  { name: "Anton", age: 34, pets: [] },
  { name: "Iryna", age: 17, pets: ["dog"] },
  { name: "Olena", age: 25, pets: ["parrot"] },
];

const adults = people.filter((person) => person.age > 20);

console.log("\nPeople older than 20:", adults);

//За допомогою map пройтися по масиву із завдання вище та додати кожному домашню тварину. Результат вивести у консоль.

const updatedPeople = people.map((person) => {
  return {
    ...person,
    pets: [...person.pets, "rat"],
  };
});

console.log("\nPeople with new pets:", updatedPeople);

/*Створити масив із 10 елементів і заповнити його числом 42 за допомогою відповідного методу (завдання знайти його в документації, посилання в описі до лекції). 
За допомогою splice вставити на 5-ту позицію слово "answer". За допомогою find знайти це слово і вивести його у консоль.*/

const array = new Array(10).fill(42);

array.splice(4, 0, "answer");

const output = array.find(item => item === "answer");

console.log("\n" + output);

//Створіть об'єкт із кількома ключами на ваш розсуд. І наведіть приклади використання keys, hasOwn, values.

const bmwM5 = {
    brand: "BMW",
    model: "M5",
    generation: "F90",
    year: 2017,
    engine: "4.4L V8",
    horsepower: 600,
    isElectric: false
};

const objKeys = Object.keys(bmwM5);
console.log("\nKeys of our object:", objKeys)

const objValues = Object.values(bmwM5);
console.log("\nValues of our object:", objValues)

console.log("\nIs there a key 'color'? -", Object.hasOwn(bmwM5, "color"));
console.log("Is there a key 'model'? -", Object.hasOwn(bmwM5, "model"));