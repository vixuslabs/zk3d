import { Struct, Bool } from 'o1js';
import { Real64 } from './Real64';
import { Vector3 } from './Vector3';
import { Sphere } from './Sphere';
import { Box3 } from './Box3';

interface PlaneClass {
  normal: Vector3;
  constant: Real64;
  set: (normal: Vector3, constant: Real64) => Plane;
  setComponents: (x: Real64, y: Real64, z: Real64, w: Real64) => Plane;
  setFromNormalAndCoplanarPoint: (normal: Vector3, point: Vector3) => Plane;
  setFromCoplanarPoints: (a: Vector3, b: Vector3, c: Vector3) => Plane;
  copy: (plane: Plane) => Plane;
  negate: () => Plane;
  distanceToPoint: (point: Vector3) => Real64;
  distanceToSphere: (sphere: Sphere) => Real64;
  projectPoint: (point: Vector3, target: Vector3) => Vector3;
  intersectLine: (start: Vector3, end: Vector3) => Vector3;
  intersectsLine: (start: Vector3, end: Vector3) => Bool;
  intersectsSphere: (sphere: Sphere) => Bool;
  coplanarPoint: () => Vector3;
  translate: (offset: Vector3) => Plane;
  equals: (plane: Plane) => Bool;
  clone: () => Plane;
}

export class Plane extends Struct({
  normal: Vector3,
  constant: Real64,
}) implements PlaneClass {
  constructor(value: {
    normal: Vector3,
    constant: Real64,
  }) {
    super(value);
  }

  set(normal: Vector3, constant: Real64) {
    this.normal = normal;
    this.constant = constant;
    return this;
  }

  toArray() {
    return [this.normal.x, this.normal.y, this.normal.z, this.constant];
  }

  setComponents(x: Real64, y: Real64, z: Real64, w: Real64) {
    this.normal.set(x, y, z);
    this.constant.set(w);
    return this;
  }

  setFromNormalAndCoplanarPoint(normal: Vector3, point: Vector3) {
    this.normal = normal;
    this.constant = normal.dot(point);
    return this;
  }

  setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3) {
    const v1 = Vector3.empty();
    const v2 = Vector3.empty();
    const normal = v1.subVectors(c, b).cross(v2.subVectors(a, b)).quasiNormalize();
    this.setFromNormalAndCoplanarPoint(normal, a);
    return this;
  }

  copy(plane: Plane) {
    this.normal = plane.normal.clone();
    this.constant = plane.constant.clone();
    return this;
  }

  negate() {
    this.constant = this.constant.neg();
    this.normal = this.normal.negate();
    return this;
  }

  distanceToPoint(point: Vector3) {
    return this.normal.dot(point).add(this.constant);
  }

  distanceToSphere(sphere: Sphere) {
    return this.distanceToPoint(sphere.center).sub(sphere.radius);
  }

  projectPoint(point: Vector3, target: Vector3) {
    return target.copy(this.normal).multiplyScalar(this.distanceToPoint(point).neg()).add(point);
  }

  intersectLine(start: Vector3, end: Vector3) {
    const startDistance = this.distanceToPoint(start);
    const endDistance = this.distanceToPoint(end);
    const t = startDistance.div(startDistance.sub(endDistance));
    return start.clone().add(end.clone().sub(start).multiplyScalar(t));
  }

  intersectsLine(start: Vector3, end: Vector3) {
    const startSign = this.distanceToPoint(start).isPositive();
    const endSign = this.distanceToPoint(end).isPositive();
    return startSign.equals(endSign).not();
  }

  // TODO: intersectsBox

  intersectsSphere(sphere: Sphere) {
    return this.distanceToSphere(sphere).isPositive().not();
  }

  coplanarPoint() {
    return this.normal.clone().multiplyScalar(this.constant.neg());
  }

  // TODO: applyMatrix4

  translate(offset: Vector3) {
    this.constant = this.constant.sub(this.normal.dot(offset));
    return this;
  }

  equals(plane: Plane) {
    return Bool.and(this.normal.equals(plane.normal), this.constant.equals(plane.constant));
  }

  clone() {
    return new Plane({
      normal: this.normal.clone(),
      constant: this.constant.clone(),
    });
  }

}
