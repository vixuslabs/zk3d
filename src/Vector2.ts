import { Struct } from "o1js";
import { Real64 } from "./Real64";

export class Vector2 extends Struct({ x: Real64, y: Real64 }) {
  constructor(value: { x: Real64; y: Real64 }) {
    super(value);
  }

  static fromNumbers(x: number , y: number) {
    return new Vector2({ 
      x: Real64.from(x),
      y: Real64.from(y),
    });
  }

  toString() {
    return `Vector2( ${this.x.toString()}, ${this.y.toString()} )`;
  }

  set(x: Real64, y: Real64 ) {
    this.x = x;
    this.y = y;
    return this;
  }

  setScalar(scalar: Real64) {
    this.x = scalar;
    this.y = scalar;
    return this;
  }

  setX(x: Real64) {
    this.x = x;
    return this;
  }

  setY(y: Real64) {
    this.y = y;
    return this;
  }

  setComponent(index: number, value: Real64) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      default:
        throw new Error( 'index is out of range: ' + index );
    }
    return this;
  }

  getComponent(index: number) {
    switch (index) {
      case 0: return this.x;
      case 1: return this.y;
      default: throw new Error( 'index is out of range: ' + index );
    }
  }

  clone() {
    return new Vector2({ x: this.x, y: this.y });
  }

  copy(v: Vector2) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  add(v: Vector2) {
    this.x = this.x.add(v.x);
    this.y = this.y.add(v.y);
    return this;
  }

  addScalar(s: Real64) {
    this.x = this.x.add(s);
    this.y = this.y.add(s);
    return this;
  }

  addVectors(a: Vector2, b: Vector2) {
    this.x = a.x.add(b.x);
    this.y = a.y.add(b.y);
    return this;
  }

  addScaledVector(v: Vector2, s: Real64) {
    this.x = this.x.add(v.x.mul(s));
    this.y = this.y.add(v.y.mul(s));
    return this;
  }

  sub(v: Vector2) {
    this.x = this.x.sub(v.x);
    this.y = this.y.sub(v.y);
    return this;
  }

  subScalar(s: Real64) {
    this.x = this.x.sub(s);
    this.y = this.y.sub(s);
    return this;
  }

  subVectors(a: Vector2, b: Vector2) {
    this.x = a.x.sub(b.x);
    this.y = a.y.sub(b.y);
    return this;
  }

  multiply(v: Vector2) {
    this.x = this.x.mul(v.x);
    this.y = this.y.mul(v.y);
    return this;
  }

  multiplyScalar(scalar: Real64) {
    this.x = this.x.mul(scalar);
    this.y = this.y.mul(scalar);
    return this;
  }

  divide(v: Vector2) {
    this.x = this.x.div(v.x);
    this.y = this.y.div(v.y);
    return this;
  }

  divideScalar(scalar: Real64) {
    return this.multiplyScalar(scalar.inv());
  }

  applyMatrix3(m: any) {
    const x = this.x;
    const y = this.y;
    this.x = m.elements[0].mul(x).add(m.elements[3].mul(y)).add(m.elements[6]);
    this.y = m.elements[1].mul(x).add(m.elements[4].mul(y)).add(m.elements[7]);
    return this;
  }

  negate() {
    this.x = this.x.neg();
    this.y = this.y.neg();
    return this;
  }

  dot(v: Vector2) {
    return this.x.mul(v.x).add(this.y.mul(v.y));
  }

  lengthSq() {
    return this.x.mul(this.x).add(this.y.mul(this.y));
  }

  distanceToSquared(v: Vector2) {
    return v.clone().sub(this).lengthSq();
  }

  lerp(v: Vector2, alpha: Real64) {
    this.x = this.x.add(v.x.sub(this.x).mul(alpha));
    this.y = this.y.add(v.y.sub(this.y).mul(alpha));
    return this;
  }

  lerpVectors(v1: Vector2, v2: Vector2, alpha: Real64) {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
  }

  cross(v: Vector2) {
    return this.crossVectors(this, v);
  }

  crossVectors(a: Vector2, b: Vector2) {
    const ax = a.x;
    const ay = a.y;
    const bx = b.x;
    const by = b.y;
    this.x = ay.mul(bx).sub(ax.mul(by));
    this.y = ax.mul(by).sub(ay.mul(bx));
    return this;
  }

  fromArray(array: Real64[], offset: number = 0) {
    this.x = array[offset];
    this.y = array[offset + 1];
    return this;
  }

  toArray(array: Real64[] = [], offset: number = 0) {
    array[offset] = this.x;
    array[offset + 1] = this.y;
    return array;
  }

  fromBufferAttribute(attribute: any, index: number) {
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    return this;
  }
}