import { Field, provable, Provable, Int64 } from 'o1js';
import * as ZK3D from '../../build/src/index.js';
import * as THREE from 'three';

// Define test vectors
const v1 = [1, 2, 3];
const v2 = [4, 5, 6];
// Define threejs vectors
const v1t = new THREE.Vector3(v1[0], v1[1], v1[2]);
const v2t = new THREE.Vector3(v2[0], v2[1], v2[2]);
// Define zk3d vectors
const v1z = ZK3D.Vector3.fromNumbers(v1[0], v1[1], v1[2]);
const v2z = ZK3D.Vector3.fromNumbers(v2[0], v2[1], v2[2]);

// Test vector addition
console.log("Testing vector addition...");
console.log("threejs: ", v1t.add(v2t));
console.log("zk3d: ", v1z.add(v2z).toString());

// Test vector subtraction
console.log("Testing vector subtraction...");
console.log("threejs: ", v1t.sub(v2t));
console.log("zk3d: ", v1z.sub(v2z));

// Test vector multiplication
console.log("Testing vector multiplication...");
console.log("threejs: ", v1t.multiply(v2t));
console.log("zk3d: ", v1z.multiply(v2z));

// Test multiplication by scalar
console.log("Testing multiplication by scalar...");
const scalar = 3;
console.log("threejs: ", v1t.multiplyScalar(scalar));
console.log("zk3d: ", v1z.multiplyScalar(Int64.from(scalar)));

// Test dot product
// console.log("Testing dot product...");
// console.log("threejs: ", v1t.do .dot(v2t));
// console.log("zk3d: ", v1z.dot(v2z));



// // provable
// let Matrix3x3 = provable([
//   [Field, Field, Field],
//   [Field, Field, Field],
//   [Field, Field, Field],
// ]);
// // Provable.Array -- types somewhat more loosely but can be easier to write
// let Matrix3x4 = Provable.Array(Provable.Array(Field, 4), 3);
// let Matrix4x3 = Provable.Array(Provable.Array(Field, 3), 4);

// /* @param x an n*m matrix, encoded as x[i][k] for row i column k.
//  * @param y an m*o matrix, both encoded as y[k][j] for row j column j.
//  * Returns an n*o matrix.
//  */
// function matrixMul(x: Field[][], y: Field[][]): Field[][] {
//   let n = x.length;
//   let m = y.length; // has to be === x[0].length
//   let o = y[0].length;

//   let result: Field[][] = [];

//   // Compute the output matrix.
//   for (let i = 0; i < n; i++) {
//     result[i] = [];
//     for (let j = 0; j < o; j++) {
//       result[i][j] = Field(0);
//       for (let k = 0; k < m; k++) {
//         result[i][j] = result[i][j].add(x[i][k].mul(y[k][j]));
//       }
//     }
//   }
//   return result;
// }

// function circuit(): Field[][] {
//   let x = Provable.witness(Matrix3x4, () => {
//     return [
//       [Field.random(), Field.random(), Field.random(), Field.random()],
//       [Field.random(), Field.random(), Field.random(), Field.random()],
//       [Field.random(), Field.random(), Field.random(), Field.random()],
//     ];
//   });
//   let y = Provable.witness(Matrix4x3, () => {
//     return [
//       [Field.random(), Field.random(), Field.random()],
//       [Field.random(), Field.random(), Field.random()],
//       [Field.random(), Field.random(), Field.random()],
//       [Field.random(), Field.random(), Field.random()],
//     ];
//   });
//   return matrixMul(x, y);
// }

// let { rows } = Provable.constraintSystem(circuit);
// let result: Field[][];
// Provable.runAndCheck(() => {
//   let result_ = circuit();
//   Provable.asProver(() => {
//     result = result_.map((x) => x.map((y) => y.toConstant()));
//   });
// });
// console.log({ rows, result: Matrix3x3.toJSON(result!) });