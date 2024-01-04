import * as ZK3D from '../../build/src/index.js';

const n1 = ZK3D.Real64.from(0.123);
const n2 = ZK3D.Real64.from(0.456);

console.log(n1.toString());
console.log(n2.toString());

console.log('Testing addition...');
console.log('Adding n1 and n2...');
console.log(n1.clone().add(n2).toString());

console.log('Testing subtraction...');
console.log('Subtracting n2 from n1...');
console.log(n1.clone().sub(n2).toString());

console.log('Testing multiplication...');
console.log('Multiplying n1 and n2...');
console.log(n1.clone().mul(n2).toString());

console.log('Testing division...');
console.log('Dividing n1 by n2...');
console.log(n1.clone().div(n2).toString());
