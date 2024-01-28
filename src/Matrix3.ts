import { Struct } from "o1js";
import { Vector3} from "./Vector3";
import { Real64 } from "./Real64";
import { Matrix4 } from "./Matrix4";

export class Matrix3 extends Struct({
  n11: Real64,
  n12: Real64,
  n13: Real64,
  n21: Real64,
  n22: Real64,
  n23: Real64,
  n31: Real64,
  n32: Real64,
  n33: Real64,
}) {
  constructor(value: {
    n11: Real64,
    n12: Real64,
    n13: Real64,
    n21: Real64,
    n22: Real64,
    n23: Real64,
    n31: Real64,
    n32: Real64,
    n33: Real64,
  }) {
    super(value);
  }

  set(n11: Real64, n12: Real64, n13: Real64, n21: Real64, n22: Real64, n23: Real64, n31: Real64, n32: Real64, n33: Real64) {
    this.n11 = n11;
    this.n12 = n12;
    this.n13 = n13;
    this.n21 = n21;
    this.n22 = n22;
    this.n23 = n23;
    this.n31 = n31;
    this.n32 = n32;
    this.n33 = n33;
    return this;
  }

  identity() {
    this.set(
      Real64.from(1),
      Real64.zero,
      Real64.zero,
      Real64.zero,
      Real64.from(1),
      Real64.zero,
      Real64.zero,
      Real64.zero,
      Real64.from(1),
    );
    return this;
  }

  copy(m: Matrix3) {
    this.n11 = m.n11;
    this.n12 = m.n12;
    this.n13 = m.n13;
    this.n21 = m.n21;
    this.n22 = m.n22;
    this.n23 = m.n23;
    this.n31 = m.n31;
    this.n32 = m.n32;
    this.n33 = m.n33;
    return this;
  }    

  setFromMatrix4(m: Matrix4) {
    const me = m.elements();
    this.set(
      me[0], me[1], me[2],
      me[4], me[5], me[6],
      me[8], me[9], me[10],
    );
    return this;
  }

  toArray() {
    return [
      this.n11, this.n12, this.n13,
      this.n21, this.n22, this.n23,
      this.n31, this.n32, this.n33,
    ];
  }

  extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3) {
    xAxis.setFromMatrix3Column(this, 0);
    yAxis.setFromMatrix3Column(this, 1);
    zAxis.setFromMatrix3Column(this, 2);
    return this;
  }

  static fromElements(arr: Real64[]) {
    return new Matrix3({
      n11: arr[0],
      n12: arr[1],
      n13: arr[2],
      n21: arr[3],
      n22: arr[4],
      n23: arr[5],
      n31: arr[6],
      n32: arr[7],
      n33: arr[8],
    });
  }

  clone() {
    return new Matrix3({
      n11: this.n11,
      n12: this.n12,
      n13: this.n13,
      n21: this.n21,
      n22: this.n22,
      n23: this.n23,
      n31: this.n31,
      n32: this.n32,
      n33: this.n33,
    });
  }

  multiplyScalar(s: Real64) {
    this.n11.mul(s);
    this.n12.mul(s);
    this.n13.mul(s);
    this.n21.mul(s);
    this.n22.mul(s);
    this.n23.mul(s);
    this.n31.mul(s);
    this.n32.mul(s);
    this.n33.mul(s);
    return this;
  }

  multiply(m: Matrix3) {
    return this.multiplyMatrices(this, m);
  }

  premultiply(m: Matrix3) {
    return this.multiplyMatrices(m, this);
  }

  multiplyMatrices(a: Matrix3, b: Matrix3) {
    const a11 = a.n11, a12 = a.n12, a13 = a.n13;
    const a21 = a.n21, a22 = a.n22, a23 = a.n23;
    const a31 = a.n31, a32 = a.n32, a33 = a.n33;

    const b11 = b.n11, b12 = b.n12, b13 = b.n13;
    const b21 = b.n21, b22 = b.n22, b23 = b.n23;
    const b31 = b.n31, b32 = b.n32, b33 = b.n33;

    this.n11 = a11.mul(b11).add(a12.mul(b21)).add(a13.mul(b31));
    this.n12 = a11.mul(b12).add(a12.mul(b22)).add(a13.mul(b32));
    this.n13 = a11.mul(b13).add(a12.mul(b23)).add(a13.mul(b33));

    this.n21 = a21.mul(b11).add(a22.mul(b21)).add(a23.mul(b31));
    this.n22 = a21.mul(b12).add(a22.mul(b22)).add(a23.mul(b32));
    this.n23 = a21.mul(b13).add(a22.mul(b23)).add(a23.mul(b33));

    this.n31 = a31.mul(b11).add(a32.mul(b21)).add(a33.mul(b31));
    this.n32 = a31.mul(b12).add(a32.mul(b22)).add(a33.mul(b32));
    this.n33 = a31.mul(b13).add(a32.mul(b23)).add(a33.mul(b33));

    return this;
  }

  determinant() {
    const a = this.n11, b = this.n12, c = this.n13;
    const d = this.n21, e = this.n22, f = this.n23;
    const g = this.n31, h = this.n32, i = this.n33;
    return a.mul(e).mul(i).add(b.mul(f).mul(g)).add(c.mul(d).mul(h)).sub(c.mul(e).mul(g)).sub(b.mul(d).mul(i)).sub(a.mul(f).mul(h));
  }

  transpose() {
    let tmp = this.n12;
    this.n12 = this.n21;
    this.n21 = tmp;

    tmp = this.n13;
    this.n13 = this.n31;
    this.n31 = tmp;

    tmp = this.n23;
    this.n23 = this.n32;
    this.n32 = tmp;

    return this;
  }

  invert() {
    const a = this.n11, b = this.n12, c = this.n13;
    const d = this.n21, e = this.n22, f = this.n23;
    const g = this.n31, h = this.n32, i = this.n33;

    const det = this.determinant();
    if (det.equals(Real64.zero)) {
      console.error('Matrix3: determinant is zero, cannot invert.');
      return this.identity();
    }

    const invDet = det.inv();

    this.n11 = e.mul(i).sub(f.mul(h)).mul(invDet);
    this.n12 = c.mul(h).sub(b.mul(i)).mul(invDet);
    this.n13 = b.mul(f).sub(c.mul(e)).mul(invDet);

    this.n21 = f.mul(g).sub(d.mul(i)).mul(invDet);
    this.n22 = a.mul(i).sub(c.mul(g)).mul(invDet);
    this.n23 = c.mul(d).sub(a.mul(f)).mul(invDet);

    this.n31 = d.mul(h).sub(e.mul(g)).mul(invDet);
    this.n32 = b.mul(g).sub(a.mul(h)).mul(invDet);
    this.n33 = a.mul(e).sub(b.mul(d)).mul(invDet);

    return this;
  }

  scale(s: Vector3) {
    const a = s.x, b = s.y, c = s.z;
    this.n11.mul(a);
    this.n12.mul(b);
    this.n13.mul(c);
    this.n21.mul(a);
    this.n22.mul(b);
    this.n23.mul(c);
    this.n31.mul(a);
    this.n32.mul(b);
    this.n33.mul(c);
    return this;
  }

  makeTranslation(x: Real64, y: Real64) {
    this.set(
      Real64.from(1), Real64.zero, x,
      Real64.zero, Real64.from(1), y,
      Real64.zero, Real64.zero, Real64.from(1),
    );
    return this;
  }

  makeScale(x: Real64, y: Real64) {
    this.set(
      x, Real64.zero, Real64.zero,
      Real64.zero, y, Real64.zero,
      Real64.zero, Real64.zero, Real64.from(1),
    );
    return this;
  }

  makeShear(x: Real64, y: Real64) {
    this.set(
      Real64.from(1), x, Real64.zero,
      y, Real64.from(1), Real64.zero,
      Real64.zero, Real64.zero, Real64.from(1),
    );
    return this;
  }

  // TODO: Figure out how to implement trigonometric functions with Real64
  // makeRotation(theta: Real64) {
  //   const c = theta.cos();
  //   const s = theta.sin();
  //   this.set(
  //     c, s.neg(), Real64.zero,
  //     s, c, Real64.zero,
  //     Real64.zero, Real64.zero, Real64.from(1),
  //   );
  //   return this;
  // }

  equals(m: Matrix3) {
    return this.n11.equals(m.n11) && this.n12.equals(m.n12) && this.n13.equals(m.n13) &&
      this.n21.equals(m.n21) && this.n22.equals(m.n22) && this.n23.equals(m.n23) &&
      this.n31.equals(m.n31) && this.n32.equals(m.n32) && this.n33.equals(m.n33);
  }

}