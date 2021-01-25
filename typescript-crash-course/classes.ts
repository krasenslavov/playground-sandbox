interface UserInterface {
  name: string;
  email: string;
  age: number;
  register();
  payInvoice();
}

class User implements UserInterface {
  // public name: string;
  // protected email: string;
  // private age: number;

  name: string;
  email: string;
  age: number;

  constructor(name: string, email: string, age: number) {
    this.name = name;
    this.email = email;
    this.age = age;

    console.log(`User created ${this.name}.`);
  }

  register() {
    console.log(`${this.name} is now registered.`);
  }

  payInvoice() {
    console.log(`${this.name} paid invoice.`)
  }
}

class Member extends User {
  id: number;

  constructor(id: number, name: string, email: string, age: number) {
    super(name, email, age);
    this.id = id;
  }

  payInvoice() {
    super.payInvoice();
  }
}

// let john = new User('John', 'john@yahoo.com', 39);
// john.register();
// console.log(john.age, john.email, john.name);

let mike: User = new Member(1, "Mike", "mike@gmail.com", 31);
mike.payInvoice();