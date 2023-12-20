import { Field, Poseidon, Struct, Provable, Int64 } from "o1js";
import { SCALE } from "./zk3d";

export class Vector3 extends Struct({ x: Int64, y: Int64, z: Int64 }) {
  constructor(value: { x: Int64; y: Int64; z: Int64 }) {
    super(value);
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

  // TODO: applyMatrix4

}