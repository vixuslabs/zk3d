import { Field, Struct, Int64 } from "o1js";

export class Real64 extends Struct({ integer: Int64 }) {
  constructor(value: { integer: Int64 }) {
    super(value);
  }

  static SCALE = 10000;

  static from(x: number) {
    return new Real64({ integer: Int64.from(Math.round(x * Real64.SCALE)) });
  }

  static fromField(x: Field) {
    return new Real64({ integer: Int64.fromField(x) });
  }

  static fromJsonString(x: string) {
    return new Real64({ integer: Int64.fromJSON(x) });
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

}