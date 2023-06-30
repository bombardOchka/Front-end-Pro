function Student(name, faculty, marks) {
  this.name = name;
  this.faculty = faculty;
  this.marks = marks;

  this.getMedianMark = function() {
    let mediana = 0;
    if (this.marks.length % 2 === 0) {
        mediana = (this.marks[this.marks.length / 2 - 1] + this.marks[this.marks.length / 2]) / 2;
    }
    else {
        mediana = this.marks[(this.marks.length + 1) / 2 - 1];
    }
    return mediana;
  };

  this.getMaxMark = function() {
    return Math.max(...this.marks);
  };

  this.getMinMark = function() {
    return Math.min(...this.marks);
  };

  this.getTotal = function() {
    sum = this.marks.reduce(function(acc, el) {
      return acc + el;
    }, 0)
    return sum;
  };

  this.getAvgMark = function() {
    return this.getTotal() / this.marks.length;
  };

  this.getInfo = function() {
    return (`${this.name} ${this.faculty} ${this.getTotal()}`);
  };
}


const student = new Student('John', 'Programming', [5, 5, 3, 4, 5, 4]);

console.log(student.getAvgMark());
console.log(student.getMedianMark());
console.log(student.getMaxMark());
console.log(student.getMinMark());
console.log(student.getTotal());
console.log(student.getInfo());