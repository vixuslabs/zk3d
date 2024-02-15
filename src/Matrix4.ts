import { Struct } from "o1js";
import { Vector3} from "./Vector3.js";
import { Real64 } from "./Real64.js";
import { Matrix3 } from "./Matrix3.js";

export class Matrix4 extends Struct({
  n11: Real64,
  n12: Real64,
  n13: Real64,
  n14: Real64,
  n21: Real64,
  n22: Real64,
  n23: Real64,
  n24: Real64,
  n31: Real64,
  n32: Real64,
  n33: Real64,
  n34: Real64,
  n41: Real64,
  n42: Real64,
  n43: Real64,
  n44: Real64,
}) {
  constructor(value: {
    n11: Real64;
    n12: Real64;
    n13: Real64;
    n14: Real64;
    n21: Real64;
    n22: Real64;
    n23: Real64;
    n24: Real64;
    n31: Real64;
    n32: Real64;
    n33: Real64;
    n34: Real64;
    n41: Real64;
    n42: Real64;
    n43: Real64;
    n44: Real64;
  }) {
    super(value);
  }

  set(
    n11: Real64,
    n12: Real64,
    n13: Real64,
    n14: Real64,
    n21: Real64,
    n22: Real64,
    n23: Real64,
    n24: Real64,
    n31: Real64,
    n32: Real64,
    n33: Real64,
    n34: Real64,
    n41: Real64,
    n42: Real64,
    n43: Real64,
    n44: Real64
  ) {
    this.n11 = n11;
    this.n12 = n12;
    this.n13 = n13;
    this.n14 = n14;
    this.n21 = n21;
    this.n22 = n22;
    this.n23 = n23;
    this.n24 = n24;
    this.n31 = n31;
    this.n32 = n32;
    this.n33 = n33;
    this.n34 = n34;
    this.n41 = n41;
    this.n42 = n42;
    this.n43 = n43;
    this.n44 = n44;
    return this;
  }

  identity() {
    this.set(
      Real64.from(1),
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(1),
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(1),
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(1)
    );
    return this;
  }

  elements() {
    return [
      this.n11,
      this.n12,
      this.n13,
      this.n14,
      this.n21,
      this.n22,
      this.n23,
      this.n24,
      this.n31,
      this.n32,
      this.n33,
      this.n34,
      this.n41,
      this.n42,
      this.n43,
      this.n44,
    ];
  }

  clone() {
    return new Matrix4({
      n11: this.n11,
      n12: this.n12,
      n13: this.n13,
      n14: this.n14,
      n21: this.n21,
      n22: this.n22,
      n23: this.n23,
      n24: this.n24,
      n31: this.n31,
      n32: this.n32,
      n33: this.n33,
      n34: this.n34,
      n41: this.n41,
      n42: this.n42,
      n43: this.n43,
      n44: this.n44,
    });
  }

  copy(m: Matrix4) {
    this.n11 = m.n11;
    this.n12 = m.n12;
    this.n13 = m.n13;
    this.n14 = m.n14;
    this.n21 = m.n21;
    this.n22 = m.n22;
    this.n23 = m.n23;
    this.n24 = m.n24;
    this.n31 = m.n31;
    this.n32 = m.n32;
    this.n33 = m.n33;
    this.n34 = m.n34;
    this.n41 = m.n41;
    this.n42 = m.n42;
    this.n43 = m.n43;
    this.n44 = m.n44;
    return this;
  }

  copyPosition(m: Matrix4) {
    this.n41 = m.n41;
    this.n42 = m.n42;
    this.n43 = m.n43;
    return this;
  }

  setFromMatrix3(m: Matrix3) {
    this.set(
      m.n11,
      m.n12,
      m.n13,
      Real64.from(0),
      m.n21,
      m.n22,
      m.n23,
      Real64.from(0),
      m.n31,
      m.n32,
      m.n33,
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(1)
    );
    return this;
  }

  extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3) {
    xAxis.setFromMatrixColumn(this, 0);
    yAxis.setFromMatrixColumn(this, 1);
    zAxis.setFromMatrixColumn(this, 2);
    return this;
  }

  makeBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3) {
    this.set(
      xAxis.x,
      yAxis.x,
      zAxis.x,
      Real64.from(0),
      xAxis.y,
      yAxis.y,
      zAxis.y,
      Real64.from(0),
      xAxis.z,
      yAxis.z,
      zAxis.z,
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(1)
    );
    return this;
  }

  //TODO: extractRotation
  //TODO: makeRotationFromEuler
  //TODO: makeRotationFromQuaternion
  //TODO: lookAt
  
  multiply(m: Matrix4) {
    return this.multiplyMatrices(this, m);
  }

  premultiply(m: Matrix4) {
    return this.multiplyMatrices(m, this);
  }

  multiplyMatrices(a: Matrix4, b: Matrix4) {
    const a11 = a.n11, a12 = a.n12, a13 = a.n13, a14 = a.n14;
    const a21 = a.n21, a22 = a.n22, a23 = a.n23, a24 = a.n24;
    const a31 = a.n31, a32 = a.n32, a33 = a.n33, a34 = a.n34;
    const a41 = a.n41, a42 = a.n42, a43 = a.n43, a44 = a.n44;

    const b11 = b.n11, b12 = b.n12, b13 = b.n13, b14 = b.n14;
    const b21 = b.n21, b22 = b.n22, b23 = b.n23, b24 = b.n24;
    const b31 = b.n31, b32 = b.n32, b33 = b.n33, b34 = b.n34;
    const b41 = b.n41, b42 = b.n42, b43 = b.n43, b44 = b.n44;

    this.n11 = a11.mul(b11).add(a12.mul(b21)).add(a13.mul(b31)).add(a14.mul(b41));
    this.n12 = a11.mul(b12).add(a12.mul(b22)).add(a13.mul(b32)).add(a14.mul(b42));
    this.n13 = a11.mul(b13).add(a12.mul(b23)).add(a13.mul(b33)).add(a14.mul(b43));
    this.n14 = a11.mul(b14).add(a12.mul(b24)).add(a13.mul(b34)).add(a14.mul(b44));

    this.n21 = a21.mul(b11).add(a22.mul(b21)).add(a23.mul(b31)).add(a24.mul(b41));
    this.n22 = a21.mul(b12).add(a22.mul(b22)).add(a23.mul(b32)).add(a24.mul(b42));
    this.n23 = a21.mul(b13).add(a22.mul(b23)).add(a23.mul(b33)).add(a24.mul(b43));
    this.n24 = a21.mul(b14).add(a22.mul(b24)).add(a23.mul(b34)).add(a24.mul(b44));

    this.n31 = a31.mul(b11).add(a32.mul(b21)).add(a33.mul(b31)).add(a34.mul(b41));
    this.n32 = a31.mul(b12).add(a32.mul(b22)).add(a33.mul(b32)).add(a34.mul(b42));
    this.n33 = a31.mul(b13).add(a32.mul(b23)).add(a33.mul(b33)).add(a34.mul(b43));
    this.n34 = a31.mul(b14).add(a32.mul(b24)).add(a33.mul(b34)).add(a34.mul(b44));

    this.n41 = a41.mul(b11).add(a42.mul(b21)).add(a43.mul(b31)).add(a44.mul(b41));
    this.n42 = a41.mul(b12).add(a42.mul(b22)).add(a43.mul(b32)).add(a44.mul(b42));
    this.n43 = a41.mul(b13).add(a42.mul(b23)).add(a43.mul(b33)).add(a44.mul(b43));
    this.n44 = a41.mul(b14).add(a42.mul(b24)).add(a43.mul(b34)).add(a44.mul(b44));

    return this;
  }

  multiplyScalar(s: Real64) {
    this.n11.mul(s);
    this.n12.mul(s);
    this.n13.mul(s);
    this.n14.mul(s);
    this.n21.mul(s);
    this.n22.mul(s);
    this.n23.mul(s);
    this.n24.mul(s);
    this.n31.mul(s);
    this.n32.mul(s);
    this.n33.mul(s);
    this.n34.mul(s);
    this.n41.mul(s);
    this.n42.mul(s);
    this.n43.mul(s);
    this.n44.mul(s);
    return this;
  }

  determinant() {
    const n11 = this.n11, n12 = this.n12, n13 = this.n13, n14 = this.n14;
    const n21 = this.n21, n22 = this.n22, n23 = this.n23, n24 = this.n24;
    const n31 = this.n31, n32 = this.n32, n33 = this.n33, n34 = this.n34;
    const n41 = this.n41, n42 = this.n42, n43 = this.n43, n44 = this.n44;

    return (
      n41.mul(
        n14.mul(n23.mul(n32)
        .sub(n13.mul(n24.mul(n32)))
        .sub(n14.mul(n22.mul(n33)))
        .add(n12.mul(n24.mul(n33)))
        .add(n13.mul(n22.mul(n34)))
        .sub(n12.mul(n23.mul(n34)))
        )
      )
      .add(n42.mul(
        n11.mul(n23.mul(n34)
        .sub(n11.mul(n24.mul(n33)))
        .add(n14.mul(n21.mul(n33)))
        .sub(n13.mul(n21.mul(n34)))
        .add(n13.mul(n24.mul(n31)))
        .sub(n14.mul(n23.mul(n31)))
        )
      ))
      .add(n43.mul(
        n11.mul(n24.mul(n32)
        .sub(n11.mul(n22.mul(n34)))
        .sub(n14.mul(n21.mul(n32)))
        .add(n12.mul(n21.mul(n34)))
        .add(n14.mul(n22.mul(n31)))
        .sub(n12.mul(n24.mul(n31)))
        )
      ))
      .add(n44.mul(
        Real64.zero.sub(n13.mul(n22.mul(n31)))
        .sub(n11.mul(n23.mul(n32)))
        .add(n11.mul(n22.mul(n33)))
        .add(n13.mul(n21.mul(n32)))
        .sub(n12.mul(n21.mul(n33)))
        .add(n12.mul(n23.mul(n31)))
        )
      ))
  }

  transpose() {
    let tmp: Real64;
    tmp = this.n12; this.n12 = this.n21; this.n21 = tmp;
    tmp = this.n13; this.n13 = this.n31; this.n31 = tmp;
    tmp = this.n14; this.n14 = this.n41; this.n41 = tmp;
    tmp = this.n23; this.n23 = this.n32; this.n32 = tmp;
    tmp = this.n24; this.n24 = this.n42; this.n42 = tmp;
    tmp = this.n34; this.n34 = this.n43; this.n43 = tmp;
    return this;
  }

  setPosition(v: Vector3) {
    this.n41 = v.x;
    this.n42 = v.y;
    this.n43 = v.z;
    return this;
  }

  invert() {
    const n11 = this.n11, n12 = this.n12, n13 = this.n13, n14 = this.n14;
    const n21 = this.n21, n22 = this.n22, n23 = this.n23, n24 = this.n24;
    const n31 = this.n31, n32 = this.n32, n33 = this.n33, n34 = this.n34;
    const n41 = this.n41, n42 = this.n42, n43 = this.n43, n44 = this.n44;

    const t11 = n23.mul(n34.mul(n42)) .sub(n24.mul(n33.mul(n42))) .add(n24.mul(n32.mul(n43))) .sub(n22.mul(n34.mul(n43))) .sub(n23.mul(n32.mul(n44))) .add(n22.mul(n33.mul(n44)));
    const t12 = n14.mul(n33.mul(n42)) .sub(n13.mul(n34.mul(n42))) .sub(n14.mul(n32.mul(n43))) .add(n12.mul(n34.mul(n43))) .add(n13.mul(n32.mul(n44))) .sub(n12.mul(n33.mul(n44)));
    const t13 = n13.mul(n24.mul(n42)) .sub(n14.mul(n23.mul(n42))) .add(n14.mul(n22.mul(n43))) .sub(n12.mul(n24.mul(n43))) .sub(n13.mul(n22.mul(n44))) .add(n12.mul(n23.mul(n44)));
    const t14 = n14.mul(n23.mul(n32)) .sub(n13.mul(n24.mul(n32))) .sub(n14.mul(n22.mul(n33))) .add(n12.mul(n24.mul(n33))) .add(n13.mul(n22.mul(n34))) .sub(n12.mul(n23.mul(n34)));

    const det = n11.mul(t11) .add(n21.mul(t12)) .add(n31.mul(t13)) .add(n41.mul(t14));
    if (det.equals(Real64.zero)) {
      return this.set(
        Real64.zero, Real64.zero, Real64.zero, Real64.zero,
        Real64.zero, Real64.zero, Real64.zero, Real64.zero,
        Real64.zero, Real64.zero, Real64.zero, Real64.zero,
        Real64.zero, Real64.zero, Real64.zero, Real64.zero
      );
    }

    this.n11 = t11.mul(det.inv());
    this.n21 = t12.mul(det.inv());
    this.n31 = t13.mul(det.inv());
    this.n41 = t14.mul(det.inv());

    this.n12 = n24.mul(n33.mul(n41)) .sub(n23.mul(n34.mul(n41))) .sub(n24.mul(n31.mul(n43))) .add(n21.mul(n34.mul(n43))) .add(n23.mul(n31.mul(n44))) .sub(n21.mul(n33.mul(n44))) .mul(det.inv());
    this.n22 = n13.mul(n34.mul(n41)) .sub(n14.mul(n33.mul(n41))) .add(n14.mul(n31.mul(n43))) .sub(n11.mul(n34.mul(n43))) .sub(n13.mul(n31.mul(n44))) .add(n11.mul(n33.mul(n44))) .mul(det.inv());
    this.n32 = n14.mul(n23.mul(n41)) .sub(n13.mul(n24.mul(n41))) .sub(n14.mul(n21.mul(n43))) .add(n11.mul(n24.mul(n43))) .add(n13.mul(n21.mul(n44))) .sub(n11.mul(n23.mul(n44))) .mul(det.inv());
    this.n42 = n13.mul(n24.mul(n31)) .sub(n14.mul(n23.mul(n31))) .add(n14.mul(n21.mul(n33))) .sub(n11.mul(n24.mul(n33))) .sub(n13.mul(n21.mul(n34))) .add(n11.mul(n23.mul(n34))) .mul(det.inv());

    this.n13 = n22.mul(n34.mul(n41)) .sub(n24.mul(n32.mul(n41))) .add(n24.mul(n31.mul(n42))) .sub(n21.mul(n34.mul(n42))) .sub(n22.mul(n31.mul(n44))) .add(n21.mul(n32.mul(n44))) .mul(det.inv());
    this.n23 = n14.mul(n32.mul(n41)) .sub(n12.mul(n34.mul(n41))) .sub(n14.mul(n31.mul(n42))) .add(n11.mul(n34.mul(n42))) .add(n12.mul(n31.mul(n44))) .sub(n11.mul(n32.mul(n44))) .mul(det.inv());
    this.n33 = n12.mul(n24.mul(n41)) .sub(n14.mul(n22.mul(n41))) .add(n14.mul(n21.mul(n42))) .sub(n11.mul(n24.mul(n42))) .sub(n12.mul(n21.mul(n44))) .add(n11.mul(n22.mul(n44))) .mul(det.inv());
    this.n43 = n14.mul(n22.mul(n31)) .sub(n12.mul(n24.mul(n31))) .sub(n14.mul(n21.mul(n32))) .add(n11.mul(n24.mul(n32))) .add(n12.mul(n21.mul(n34))) .sub(n11.mul(n22.mul(n34))) .mul(det.inv());

    this.n14 = n23.mul(n32.mul(n41)) .sub(n22.mul(n33.mul(n41))) .sub(n23.mul(n31.mul(n42))) .add(n21.mul(n33.mul(n42))) .add(n22.mul(n31.mul(n43))) .sub(n21.mul(n32.mul(n43))) .mul(det.inv());
    this.n24 = n12.mul(n33.mul(n41)) .sub(n13.mul(n32.mul(n41))) .add(n13.mul(n31.mul(n42))) .sub(n11.mul(n33.mul(n42))) .sub(n12.mul(n31.mul(n43))) .add(n11.mul(n32.mul(n43))) .mul(det.inv());
    this.n34 = n13.mul(n22.mul(n41)) .sub(n12.mul(n23.mul(n41))) .sub(n13.mul(n21.mul(n42))) .add(n11.mul(n23.mul(n42))) .add(n12.mul(n21.mul(n43))) .sub(n11.mul(n22.mul(n43))) .mul(det.inv());
    this.n44 = n12.mul(n23.mul(n31)) .sub(n13.mul(n22.mul(n31))) .add(n13.mul(n21.mul(n32))) .sub(n11.mul(n23.mul(n32))) .sub(n12.mul(n21.mul(n33))) .add(n11.mul(n22.mul(n33))) .mul(det.inv());

    return this;
  }

  scale(v: Vector3) {
    const x = v.x, y = v.y, z = v.z;
    this.n11.mul(x);
    this.n12.mul(y);
    this.n13.mul(z);
    this.n21.mul(x);
    this.n22.mul(y);
    this.n23.mul(z);
    this.n31.mul(x);
    this.n32.mul(y);
    this.n33.mul(z);
    this.n41.mul(x);
    this.n42.mul(y);
    this.n43.mul(z);
    return this;
  }

  // TODO: getMaxScaleOnAxis

  makeTranslation(x: Real64, y: Real64, z: Real64) {
    this.set(
      Real64.from(1),
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(1),
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(0),
      Real64.from(1),
      Real64.from(0),
      x,
      y,
      z,
      Real64.from(1)
    );
    return this;
  }

  // TODO: Figure out how to implement trigonometric functions with Real64
  // makeRotationX(theta: Real64) {
  //   const c = theta.cos();
  //   const s = theta.sin();
  //   this.set(
  //     Real64.from(1),
  //     Real64.from(0),
  //     Real64.from(0),
  //     Real64.from(0),
  //     Real64.from(0),
  //     c,
  //     s,
  //     Real64.from(0),
  //     Real64.from(0),
  //     Real64.zero.sub(s),
  //     c,
  //     Real64.from(0),
  //     Real64.from(0),
  //     Real64.from(0),
  //     Real64.from(0),
  //     Real64.from(1)
  //   );
  //   return this;
  // }

  // TODO: makeRotationY
  // TODO: makeRotationZ
  // TODO: makeRotationAxis

  makeScale(x: Real64, y: Real64, z: Real64) {
    this.set(
      x,
      Real64.zero,
      Real64.zero,
      Real64.zero,
      Real64.zero,
      y,
      Real64.zero,
      Real64.zero,
      Real64.zero,
      Real64.zero,
      z,
      Real64.zero,
      Real64.zero,
      Real64.zero,
      Real64.zero,
      Real64.from(1)
    );
    return this;
  }

  makeShear(x: Real64, y: Real64, z: Real64) {
    this.set(
      Real64.from(1),
      y,
      z,
      Real64.zero,
      x,
      Real64.from(1),
      z,
      Real64.zero,
      x,
      y,
      Real64.from(1),
      Real64.zero,
      Real64.zero,
      Real64.zero,
      Real64.zero,
      Real64.from(1)
    );
    return this;
  }

  // TODO: compose
  // TODO: decompose

  equals(m: Matrix4) {
    return (
      m.n11.equals(this.n11)
      .and(m.n12.equals(this.n12))
      .and(m.n13.equals(this.n13))
      .and(m.n14.equals(this.n14))
      .and(m.n21.equals(this.n21))
      .and(m.n22.equals(this.n22))
      .and(m.n23.equals(this.n23))
      .and(m.n24.equals(this.n24))
      .and(m.n31.equals(this.n31))
      .and(m.n32.equals(this.n32))
      .and(m.n33.equals(this.n33))
      .and(m.n34.equals(this.n34))
      .and(m.n41.equals(this.n41))
      .and(m.n42.equals(this.n42))
      .and(m.n43.equals(this.n43))
      .and(m.n44.equals(this.n44))
    );
  }

  static fromElements(array: Real64[]) {
    return new Matrix4({
      n11: array[0],
      n12: array[1],
      n13: array[2],
      n14: array[3],
      n21: array[4],
      n22: array[5],
      n23: array[6],
      n24: array[7],
      n31: array[8],
      n32: array[9],
      n33: array[10],
      n34: array[11],
      n41: array[12],
      n42: array[13],
      n43: array[14],
      n44: array[15]
      });
  }

  toArray() {
    return [
      this.n11,
      this.n12,
      this.n13,
      this.n14,
      this.n21,
      this.n22,
      this.n23,
      this.n24,
      this.n31,
      this.n32,
      this.n33,
      this.n34,
      this.n41,
      this.n42,
      this.n43,
      this.n44,
    ];
  }

}
