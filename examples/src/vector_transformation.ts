import { Field, provable, Provable } from 'o1js';
import * as ZK3D from '../../build/src/index.js';
import * as THREE from 'three';

// Define test vectors
const v1 = [0.001234, 2.345, 0.3456];
const v2 = [4.567, 0.05678, 6.789];
// Define threejs vectors
const v1t = new THREE.Vector3(v1[0], v1[1], v1[2]);
const v2t = new THREE.Vector3(v2[0], v2[1], v2[2]);
// Define zk3d vectors
const v1z = ZK3D.Vector3.fromNumbers(v1[0], v1[1], v1[2]);
const v2z = ZK3D.Vector3.fromNumbers(v2[0], v2[1], v2[2]);

// Test vector addition
console.log("\nTesting vector addition...");
console.log("threejs: ", v1t.clone().add(v2t));
console.log("zk3d: ", v1z.clone().add(v2z).toString());

// Test vector subtraction
console.log("\nTesting vector subtraction...");
console.log("threejs: ", v1t.clone().sub(v2t));
console.log("zk3d: ", v1z.clone().sub(v2z).toString());

// Test vector multiplication
console.log("\nTesting vector multiplication...");
console.log("threejs: ", v1t.clone().multiply(v2t));
console.log("zk3d: ", v1z.clone().multiply(v2z).toString());

// Test multiplication by scalar
console.log("\nTesting multiplication by scalar...");
const scalar = 3;
console.log("threejs: ", v1t.clone().multiplyScalar(scalar));
console.log("zk3d: ", v1z.clone().multiplyScalar(ZK3D.Real64.from(scalar)).toString());

// Test dot product
console.log("\nTesting dot product...");
console.log("threejs: ", v1t.dot(v2t));
console.log("zk3d: ", v1z.clone().dot(v2z).toString());

// Test cross product
console.log("\nTesting cross product...");
console.log("threejs: ", v1t.clone().cross(v2t));
console.log("zk3d: ", v1z.clone().cross(v2z).toString());

// Test length
console.log("\nTesting length squared...");
console.log("threejs: ", v1t.clone().lengthSq());
console.log("zk3d: ", v1z.clone().lengthSq().toString());

// Test distanceToSquared
console.log("\nTesting distanceToSquared...");
console.log("threejs: ", v1t.clone().distanceToSquared(v2t));
console.log("zk3d: ", v1z.clone().distanceToSquared(v2z).toString());

// Test lerp
console.log("\nTesting lerp...");
const alpha = 0.5;
console.log("threejs: ", v1t.clone().lerp(v2t, alpha));
console.log("zk3d: ", v1z.clone().lerp(v2z, ZK3D.Real64.from(alpha)).toString());

// Test lerpVectors
console.log("\nTesting lerpVectors...");
console.log("threejs: ", v1t.clone().lerpVectors(v2t, v1t, alpha));
console.log("zk3d: ", v1z.clone().lerpVectors(v2z, v1z, ZK3D.Real64.from(alpha)).toString());

// Test negate
console.log("\nTesting negate...");
console.log("threejs: ", v1t.clone().negate());
console.log("zk3d: ", v1z.clone().negate().toString());

// Test divide
console.log("\nTesting divide...");
console.log("threejs: ", v1t.clone().divide(v2t));
console.log("zk3d: ", v1z.clone().divide(v2z).toString());

// Test divideScalar
console.log("\nTesting divideScalar...");
console.log("threejs: ", v1t.clone().divideScalar(scalar));
console.log("zk3d: ", v1z.clone().divideScalar(ZK3D.Real64.from(scalar)).toString());

// Test applyMatrix4
// console.log("\nTesting applyMatrix4...");
// const mt = new THREE.Matrix4();
// mt.makeRotationX(0.5);
// console.log("threejs: ", v1t.clone().applyMatrix4(mt));
// const mz = new ZK3D.Matrix4 .set(mt.elements[0], mt.elements[1], mt.elements[2], mt.elements[3], mt.elements[4], mt.elements[5], mt.elements[6], mt.elements[7], mt.elements[8], mt.elements[9], mt.elements[10], mt.elements[11], mt.elements[12], mt.elements[13], mt.elements[14], mt.elements[15]);
