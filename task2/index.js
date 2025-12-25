// 1. Функції вищого порядку та замикання:

function addParamsToRequest(params) {
  let count = 0;

  return function (data) {
    return {
      ...params,
      data: { ...data },
      count: count++,
    };
  };
}

const sendData = addParamsToRequest({ "access-token": "qwerty" });

console.log(sendData({ name: "John" }));

console.log(sendData({ age: 25 }));

console.log(sendData({ city: "Kyiv" }));

// 2. Контексти і this:

const obj = {
  getData: function () {
    console.log(`Person name is: ${this.name} and age ${this.age}`);
  },
};

obj.getData.call({ name: "Oleh", age: 30 });

const someObject = {
  name: "Anna",
  age: 22,
};

const getData2 = obj.getData.bind(someObject);

getData2();

// 3. Рекурсія:

const root = {
  name: "name",

  type: "folder",

  children: [
    {
      name: "folder 1",

      type: "folder",

      children: [
        {
          name: "folder 2",

          type: "folder",

          children: [
            {
              name: "file 3",

              type: "file",

              size: 30,
            },
          ],
        },
      ],
    },

    {
      name: "file 1",

      type: "file",

      size: 10,
    },

    {
      name: "file 2",

      type: "file",

      size: 20,
    },
  ],
};

let fileNames = [];

function findFilesRecursively(obj, size) {
  if (obj.type === "file") {
    fileNames.push(obj.name);
  } else {
    obj.children.forEach((child) => findFilesRecursively(child, size));
  }
}

findFilesRecursively(root);
console.log(fileNames);

// 4. Класи:

// ES5
console.log("ES5 Function Constructors:");

function PersonES5(name, phone) {
  this.name = name;
  this.phone = phone;
}

PersonES5.prototype.introduce = function () {
  console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
};

function StudentES5(name, phone, course) {
  PersonES5.call(this, name, phone);
  this.course = course;
}

StudentES5.prototype = Object.create(PersonES5.prototype);
StudentES5.prototype.constructor = StudentES5;

StudentES5.prototype.study = function () {
  console.log(`Я навчаюся на ${this.course} курсі.`);
};

function TeacherES5(name, phone, subject) {
  PersonES5.call(this, name, phone);
  this.subject = subject;
}

TeacherES5.prototype = Object.create(PersonES5.prototype);
TeacherES5.prototype.constructor = TeacherES5;

TeacherES5.prototype.teach = function () {
  console.log(`Я викладаю ${this.subject}.`);
};

const studentES5 = new StudentES5("Іван", "0671234567", 2);
const teacherES5 = new TeacherES5("Олена", "0971234567", "Математика");

studentES5.introduce();
studentES5.study();

teacherES5.introduce();
teacherES5.teach();

// ES6
console.log("ES6 Classes:");

class Person {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }

  introduce() {
    console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
  }
}

class Student extends Person {
  constructor(name, phone, course) {
    super(name, phone);
    this.course = course;
  }
  study() {
    console.log(`Я навчаюся на ${this.course} курсі.`);
  }
}

class Teacher extends Person {
  constructor(name, phone, subject) {
    super(name, phone);
    this.subject = subject;
  }
  teach() {
    console.log(`Я викладаю ${this.subject}.`);
  }
}

const student = new Student("Іван", "0671234567", 2);
const teacher = new Teacher("Олена", "0971234567", "Математика");

student.introduce();
student.study();

teacher.introduce();
teacher.teach();
