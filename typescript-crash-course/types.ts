// console.log(`Hello from TS`);

let myString: string;
let myNum: number;
let myBool: boolean;
let myVar: any;
let strArr: string[]; // Array<string>
let numArr: number[]; // Array<number>
let boolArr: boolean[]; // Array<boolean>
let strNumTuple: [string, number];
let myVoid: void;

myString = "Hello " + "world!".slice(0, 5);
myNum = 10; // 5.5
myBool = true;
myVar = "Hello"
strArr = ["Hello", "world"];
numArr = [5, 5.5, 5.555];
boolArr = [true, false, false];
strNumTuple = ['Hello', 4];
myVoid = null; // undefined, void

// console.log(myString, myNum, myBool, strArr, numArr, strNumTuple, myVoid);