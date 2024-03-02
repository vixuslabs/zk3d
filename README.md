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
import { Matrix4, Vector3, Real64 } from "zk3d";
```

### Working with Real64

Real64 provides a high-precision numerical type, essential for accurate mathematical operations within zk3d. This class ensures that your 3D calculations maintain numerical integrity, especially critical in the context of complex transformations or when precision is paramount. Below is an example illustrating how to instantiate and use Real64:

```javascript
// Create a new Real64 instance
let num = Real64.from(12.34);

// Arithmetic operations with Real64
let sum = num.add(Real64.from(23.45)); // Perform addition
let product = num.multiply(Real64.from(3.21)); // Perform multiplication
```

### Working with Vector2

Vector2 represents two-dimensional vectors. This class can be crucial for operations in a plane or for simplifying 3D problems into 2D scenarios when appropriate. Here's how you can use it:

```javascript
// Create a new Vector2 instance
let v4 = new Vector2({ x: Real64.from(7), y: Real64.from(8) });

// Perform vector addition
let v5 = new Vector2({ x: Real64.from(1), y: Real64.from(2) });
let v6 = v4.add(v5); // v6 is now the result of v4 + v5
```

### Working with Vector3

Vector3 represents three-dimensional vectors. Here's an example of how to use it:

```javascript
// Create a new Vector3 instance
let v1 = new Vector3({
  x: Real64.from(1),
  y: Real64.from(2),
  z: Real64.from(3),
});

// Perform vector addition
let v2 = new Vector3({
  x: Real64.from(4),
  y: Real64.from(5),
  z: Real64.from(6),
});
let v3 = v1.add(v2); // v3 is now the result of v1 + v2
```

### Working with Matrix3

Matrix3 represents 3x3 matrices, which are crucial in 2D transformations and can also be applied in 3D contexts. Here's a basic usage example:

```javascript
// Create a new Matrix3 instance
let m2 = new Matrix3({
  n11: Real64.from(1),
  n12: Real64.from(0),
  n13: Real64.from(0),
  n21: Real64.from(0),
  n22: Real64.from(1),
  n23: Real64.from(0),
  n31: Real64.from(0),
  n32: Real64.from(0),
  n33: Real64.from(1),
});
```

### Working with Matrix4

Matrix4 is used for 4x4 matrix operations. Below is an example:

```javascript
// Create a new Matrix4 instance
let m1 = new Matrix4({
  n11: Real64.from(1),
  n12: Real64.from(0),
  n13: Real64.from(0),
  n14: Real64.from(0),
  n21: Real64.from(0),
  n22: Real64.from(1),
  n23: Real64.from(0),
  n24: Real64.from(0),
  n31: Real64.from(0),
  n32: Real64.from(0),
  n33: Real64.from(1),
  n34: Real64.from(0),
  n41: Real64.from(0),
  n42: Real64.from(0),
  n43: Real64.from(0),
  n44: Real64.from(1),
});

// Apply transformations
m1.makeTranslation(Real64.from(5), Real64.from(10), Real64.from(15));
```

### Working with Plane

The Plane class is used to represent and manipulate planes in 3D space:

```javascript
// Define a Plane using a point and a normal vector
let point = new Vector3({
  x: Real64.from(0),
  y: Real64.from(0),
  z: Real64.from(1),
});
let normal = new Vector3({
  x: Real64.from(0),
  y: Real64.from(1),
  z: Real64.from(0),
});
let plane = new Plane({ point: point, normal: normal });

// Calculate the distance from a point to the plane
let point2 = new Vector3({
  x: Real64.from(1),
  y: Real64.from(2),
  z: Real64.from(3),
});
let distance = plane.distanceToPoint(point2);
```

### Working with Box3

Box3 is used for bounding box operations in 3D space:

```javascript
// Create two Vector3 instances to define the Box3 corners
let min = new Vector3({
  x: Real64.from(-1),
  y: Real64.from(-1),
  z: Real64.from(-1),
});
let max = new Vector3({
  x: Real64.from(1),
  y: Real64.from(1),
  z: Real64.from(1),
});
let box = new Box3({ min: min, max: max });

// Check if a point is inside the Box3
let point = new Vector3({
  x: Real64.from(0.5),
  y: Real64.from(0.5),
  z: Real64.from(0.5),
});
let isInside = box.containsPoint(point);
```

### Working with Sphere

Sphere is utilized for representing and working with spheres in 3D space:

```javascript
// Define a Sphere with a center and a radius
let center = new Vector3({
  x: Real64.from(0),
  y: Real64.from(0),
  z: Real64.from(0),
});
let radius = Real64.from(5);
let sphere = new Sphere({ center: center, radius: radius });

// Check if a point lies on the sphere's surface
let point = new Vector3({
  x: Real64.from(3),
  y: Real64.from(4),
  z: Real64.from(0),
}); // Should be on the sphere
let isOnSurface = sphere.containsPoint(point);
```

### Contributing

Contributions to zk3d are welcome! Please read our contributing guidelines for details on how to contribute.

### License

zk3d is MIT licensed.
