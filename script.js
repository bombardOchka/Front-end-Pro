class Person {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }

  welcome() {
    console.log(`Hi! I'm ${this.name} ${this.surname}`);
  }
}



class Student extends Person {
  constructor(name, surname,faculty, marks) {
    super(name, surname);
    this.faculty = faculty;
    this.marks = marks;
  }

  getMedianMark = function() {
    let mediana = 0;
    if (this.marks.length % 2===0) {
        mediana = (this.marks[this.marks.length / 2 - 1] + this.marks[this.marks.length / 2]) / 2;
    }
    else {
        mediana = this.marks[(this.marks.length + 1) / 2 - 1];
    }
    return mediana;
  }

  getMaxMark = function() {
    return Math.max(...this.marks);
  }

  getMinMark = function() {
    return Math.min(...this.marks);
  }

  getTotal = function() {
    let sum = this.marks.reduce(function(acc, el) {
      return acc + el;
    }, 0)
    return sum;
  }

  getAvgMark = function() {
    return this.getTotal() / this.marks.length;
  }

  getInfo = function() {
    return (`${this.name} ${this.faculty} ${this.getTotal()}`);
}
}



class Headman extends Student {
  constructor(name, surname, faculty, marks) {
    super(name, surname, faculty, marks);
  }
  defendGroup() {
    console.log("This is my group. I'm their hero!");
  }
}




const person = new Person('John', 'Smith');
person.welcome();

console.log('--------------------------');

const student = new Student('Jane','Smith', 'Enginer', [5,5,3,5,4]);
student.welcome();
console.log(student.getAvgMark());
console.log(student.getMedianMark());
console.log(student.getMaxMark());
console.log(student.getMinMark());
console.log(student.getTotal());
console.log(student.getInfo());

console.log('--------------------------');

const headman = new Headman('Bruce','Smith', 'Programming', [4,4,5,3,4,4]);
headman.welcome();
headman.defendGroup();
console.log(headman.getAvgMark());
console.log(headman.getMedianMark());
console.log(headman.getMaxMark());
console.log(headman.getMinMark());
console.log(headman.getTotal());
console.log(headman.getInfo());