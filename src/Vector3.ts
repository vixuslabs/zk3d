import { Field, Poseidon, Struct, Provable, Int64 } from "o1js";
import { SCALE } from "./zk3d.js";
import { Matrix4 } from "./Matrix4.js";

const i64SCALE = Int64.from(SCALE);

export class Vector3 extends Struct({ x: Int64, y: Int64, z: Int64 }) {
  constructor(value: { x: Int64; y: Int64; z: Int64 }) {
    super(value);
  }

  static fromNumbers(x: number , y: number, z: number) {
    return new Vector3({ 
      x: Int64.from(Math.round(x * SCALE)),
      y: Int64.from(Math.round(y * SCALE)),
      z: Int64.from(Math.round(z * SCALE)),
    });
  }

  toString() {
    return `Vector3(${this.x.toString()}, ${this.y.toString()}, ${this.z.toString()})`;
    // return "Bla"
  }

  set(x: Int64, y: Int64, z: Int64 ) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  setScalar(scalar: Int64) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    return this;
  }

  setX(x: Int64) {
    this.x = x;
    return this;
  }

  setY(y: Int64) {
    this.y = y;
    return this;
  }

  setZ(z: Int64) {
    this.z = z;
    return this;
  }

  setComponent(index: number, value: Int64) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      case 2:
        this.z = value;
        break;
      default:
        throw new Error("index is out of range: " + index);
    }
    return this;
  }

  getComponent(index: number) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + index);
    }
  }

  clone() {
    return new Vector3({ x: this.x, y: this.y, z: this.z });
  }

  copy(v: Vector3) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  add(v: Vector3) {
    this.x.add(v.x);
    this.y.add(v.y);
    this.z.add(v.z);
    return this;
  }

  addScalar(s: Int64) {
    this.x.add(s);
    this.y.add(s);
    this.z.add(s);
    return this;
  }

  addVectors(a: Vector3, b: Vector3) {
    this.x = a.x.add(b.x);
    this.y = a.y.add(b.y);
    this.z = a.z.add(b.z);
    return this;
  }

  addScaledVector(v: Vector3, s: Int64) {
    this.x.add(v.x.mul(s));
    this.y.add(v.y.mul(s));
    this.z.add(v.z.mul(s));
    return this;
  }

  sub(v: Vector3) {
    this.x.sub(v.x);
    this.y.sub(v.y);
    this.z.sub(v.z);
    return this;
  }

  subScalar(s: Int64) {
    this.x.sub(s);
    this.y.sub(s);
    this.z.sub(s);
    return this;
  }

  subVectors(a: Vector3, b: Vector3) {
    this.x = a.x.sub(b.x);
    this.y = a.y.sub(b.y);
    this.z = a.z.sub(b.z);
    return this;
  }

  multiply(v: Vector3) {
    this.x.mul(v.x);
    this.y.mul(v.y);
    this.z.mul(v.z);
    return this;
  }

  multiplyScalar(s: Int64) {
    this.x.mul(s);
    this.y.mul(s);
    this.z.mul(s);
    return this;
  }

  multiplyVectors(a: Vector3, b: Vector3) {
    this.x = a.x.mul(b.x);
    this.y = a.y.mul(b.y);
    this.z = a.z.mul(b.z);
    return this;
  }

  // TODO: applyEuler

  // TODO: applyAxisAngle

  // TODO: applyMatrix3

  applyMatrix4(m: Matrix4) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    
    const w = i64SCALE.div(m.n14.mul(x) .add(m.n24.mul(y)) .add(m.n34.mul(z)) .add(m.n44).mul(i64SCALE));

    this.x = m.n11.mul(x).add(m.n21.mul(y)).add(m.n31.mul(z)).add(m.n41.mul(i64SCALE)).mul(w);
    this.y = m.n12.mul(x).add(m.n22.mul(y)).add(m.n32.mul(z)).add(m.n42.mul(i64SCALE)).mul(w);
    this.z = m.n13.mul(x).add(m.n23.mul(y)).add(m.n33.mul(z)).add(m.n43.mul(i64SCALE)).mul(w);

    return this;
  }

  setFromMatrixColumn(m: Matrix4, index: number) {
    return this.fromArray(m.toArray(), index * 4);
  }

  setFromMatrix3Column(m: Matrix4, index: number) {
    return this.fromArray(m.toArray(), index * 3);
  }

  fromArray(array: Int64[], offset: number = 0) {
    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];
    return this;
  }

  // transformDirection(m: Matrix4) {
  //   const x = this.x;
  //   const y = this.y;
  //   const z = this.z;

  //   this.x = m.n11.mul(x).add(m.n21.mul(y)).add(m.n31.mul(z)).mul(i64SCALE);
  //   this.y = m.n12.mul(x).add(m.n22.mul(y)).add(m.n32.mul(z)).mul(i64SCALE);
  //   this.z = m.n13.mul(x).add(m.n23.mul(y)).add(m.n33.mul(z)).mul(i64SCALE);

  //   return this.normalize();
  // }

  divide(v: Vector3) {
    this.x.div(v.x);
    this.y.div(v.y);
    this.z.div(v.z);
    return this;
  }

  divideScalar(s: Int64) {
    return this.multiplyScalar(i64SCALE.div(s));
  }

  negate() {
    this.x.neg();
    this.y.neg();
    this.z.neg();
    return this;
  }

  dot(v: Vector3) {
    return this.x.mul(v.x).add(this.y.mul(v.y)).add(this.z.mul(v.z));
  }

  lengthSq() {
    return this.x.mul(this.x).add(this.y.mul(this.y)).add(this.z.mul(this.z));
  }

  // length() {
  //   return this.lengthSq().sqrt();
  // }

  // setLength(length: Int64) {
  //   return this.normalize().multiplyScalar(length);
  // }

  lerp(v: Vector3, alpha: Int64) {
    this.x.add(v.x.sub(this.x).mul(alpha));
    this.y.add(v.y.sub(this.y).mul(alpha));
    this.z.add(v.z.sub(this.z).mul(alpha));
    return this;
  }

  lerpVectors(v1: Vector3, v2: Vector3, alpha: Int64) {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
  }

  cross(v: Vector3) {
    return this.crossVectors(this, v);
  }

  crossVectors(a: Vector3, b: Vector3) {
    const ax = a.x;
    const ay = a.y;
    const az = a.z;
    const bx = b.x;
    const by = b.y;
    const bz = b.z;

    this.x = ay.mul(bz).sub(az.mul(by));
    this.y = az.mul(bx).sub(ax.mul(bz));
    this.z = ax.mul(by).sub(ay.mul(bx));

    return this;
  }

  // normalize() {
  //   return this.divideScalar(this.length());
  // }
  
}