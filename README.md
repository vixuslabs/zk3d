# zk3d

**zk3d** is an open-source npm package designed to extend the mathematical capabilities of the Three.js library to o1js applications within the Mina ecosystem. It features core classes such as `Matrix4`, `Vector3`, and `Real64`, offering a wide range of mathematical operations for 3D transformations and calculations.

## Installation

To install zk3d, run the following command in your project directory:

```shell
npm install zk3d
```


## Usage

### Importing Classes

First, import the required classes into your project:

```javascript
import { Matrix4, Vector3, Real64 } from 'zk3d';
```

### Working with Vector3
Vector3 represents three-dimensional vectors. Here's an example of how to use it:

```javascript
// Create a new Vector3 instance
let v1 = new Vector3({ x: Real64.from(1), y: Real64.from(2), z: Real64.from(3) });

// Perform vector addition
let v2 = new Vector3({ x: Real64.from(4), y: Real64.from(5), z: Real64.from(6) });
let v3 = v1.add(v2); // v3 is now the result of v1 + v2
```

### Working with Matrix4
Matrix4 is used for 4x4 matrix operations. Below is an example:

```javascript
// Create a new Matrix4 instance
let m1 = new Matrix4({
    n11: Real64.from(1), n12: Real64.from(0), n13: Real64.from(0), n14: Real64.from(0),
    n21: Real64.from(0), n22: Real64.from(1), n23: Real64.from(0), n24: Real64.from(0),
    n31: Real64.from(0), n32: Real64.from(0), n33: Real64.from(1), n34: Real64.from(0),
    n41: Real64.from(0), n42: Real64.from(0), n43: Real64.from(0), n44: Real64.from(1)
});

// Apply transformations
m1.makeTranslation(Real64.from(5), Real64.from(10), Real64.from(15));
```

### Contributing
Contributions to zk3d are welcome! Please read our contributing guidelines for details on how to contribute.

### License
zk3d is MIT licensed.