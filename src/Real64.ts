import { Field, Struct, Int64, Bool, Provable } from "o1js";

interface Real64Class {
  integer: Int64;
  set: (x: Real64) => Real64;
  toField: () => Field;
  toNumber: () => number;
  inv: () => Real64;
  neg: () => Real64;
  equals: (other: Real64) => Bool;
  magnitudeGreaterThan: (other: Real64) => Bool;
  magnitudeGreaterThanOrEqual: (other: Real64) => Bool;
  magnitudeLessThan: (other: Real64) => Bool;
  magnitudeLessThanOrEqual: (other: Real64) => Bool;
  toString: () => string;
  clone: () => Real64;
  add: (other: Real64) => Real64;
  sub: (other: Real64) => Real64;
  mul: (other: Real64) => Real64;
  div: (other: Real64) => Real64;
  isPositive: () => Bool;
  setInteger: (integer: Int64) => Real64;
}

export class Real64 extends Struct({ integer: Int64 }) implements Real64Class {
  constructor(value: { integer: Int64 }) {
    super(value);
  }

  static SCALE = 10000;

  static from(x: number) {
    return new Real64({ integer: Int64.from(Math.round(x * Real64.SCALE)) });
  }

  set(x: Real64) {
    return new Real64({ integer: x.integer });
  }

  static fromField(x: Field) {
    return new Real64({ integer: Int64.fromField(x) });
  }

  toField() {
    return this.integer.toField();
  }

  toNumber() {
    return parseInt(this.integer.toString()) / Real64.SCALE;
  }

  static get zero() {
    return new Real64({ integer: Int64.zero });
  }

  inv() {
    return new Real64({ integer: Int64.from(Real64.SCALE).mul(Real64.SCALE).div(this.integer) });
  }

  neg() {
    return new Real64({ integer: this.integer.neg() });
  }

  equals(other: Real64) {
    return this.integer.equals(other.integer);
  }

  magnitudeGreaterThan(other: Real64) {
    return this.integer.magnitude.greaterThan(other.integer.magnitude);
  }

  magnitudeGreaterThanOrEqual(other: Real64) {
    return this.integer.magnitude.greaterThanOrEqual(other.integer.magnitude);
  }

  magnitudeLessThan(other: Real64) {
    return this.integer.magnitude.lessThan(other.integer.magnitude);
  }

  magnitudeLessThanOrEqual(other: Real64) {
    return this.integer.magnitude.lessThanOrEqual(other.integer.magnitude);
  }

  toString() {
    return `Real64( ${parseInt(this.integer.toString())/Real64.SCALE} )`;
  }

  clone() {
    return new Real64({ integer: this.integer });
  }

  add(other: Real64) {
    return new Real64({ integer : this.integer.add(other.integer) });
  }

  sub(other: Real64) {
    return new Real64({ integer : this.integer.sub(other.integer) });
  }

  mul(other: Real64) {
    return new Real64({ integer : this.integer.mul(other.integer).div(Real64.SCALE) });
  }

  div(other: Real64) {
    return new Real64({ integer : this.integer.mul(Real64.SCALE).div(other.integer) });
  }

  isPositive() {
    return this.integer.isPositive();
  }

  setInteger(integer: Int64) {
    this.integer = integer;
    return this;
  }

}