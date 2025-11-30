// 객체 - 퀘스트 2
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`안녕하세요, 제 이름은 ${this.name}입니다!`); 
    }
}

const person = new Person("Jane Doe", 25);
person.greet();