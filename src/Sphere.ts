import { Struct, Bool } from 'o1js';
import { Real64 } from './Real64.js';
import { Vector3 } from './Vector3.js';
import { Plane } from './Plane.js';

interface SphereClass {
  radius: Real64;
  center: Vector3;
  set: (radius: Real64, center: Vector3) => Sphere;
  copy: (sphere: Sphere) => Sphere;
  isEmpty: () => Sphere;
  makeEmpty: () => Sphere;
  containsPoint: (point: Vector3) => Bool;
  distanceSquaredToPoint: (point: Vector3) => Real64;
  intersectsSphere: (sphere: Sphere) => Bool;
  intersectsPlane: (plane: Plane) => Bool;
  translate: (offset: Vector3) => Sphere;
  equals: (sphere: Sphere) => Bool;
  clone: () => Sphere;
}

export class Sphere extends Struct({
  radius: Real64,
  center: Vector3,
}) implements SphereClass {
  constructor(value: {
    radius: Real64,
    center: Vector3,
  }) {
    super(value);
  }

  static fromNumbers(radius: number, x: number, y: number, z: number) {
    return new Sphere({
      radius: Real64.from(radius),
      center: Vector3.fromNumbers(x, y, z),
    });
  }

  set(radius: Real64, center: Vector3) {
    this.radius = radius;
    this.center = center;
    return this;
  }

  // TODO: Implement setFromPoints

  copy(sphere: Sphere) {
    this.radius = sphere.radius.clone();
    this.center = sphere.center.clone();
    return this;
  }

  isEmpty() {
    this.radius = Real64.zero;
    this.center = Vector3.empty();
    return this;
  }

  makeEmpty() {
    this.radius = Real64.from(-1);
    this.center = Vector3.empty();
    return this;
  }

  containsPoint(point: Vector3) {
    return point.distanceToSquared(this.center).magnitudeLessThanOrEqual(this.radius.mul(this.radius));
  }

  distanceSquaredToPoint(point: Vector3) {
    return point.distanceToSquared(this.center).sub(this.radius);
  }

  intersectsSphere(sphere: Sphere) {
    const radiusSum = this.radius.add(sphere.radius);
    return sphere.center.distanceToSquared(this.center).magnitudeLessThanOrEqual(radiusSum.mul(radiusSum));
  }

  intersectsPlane(plane: Plane) {
    return plane.distanceToPoint(this.center).magnitudeLessThanOrEqual(this.radius);
  }

  // TODO: Implement clampPoint, getBoundingBox, applyMatrix4, union

  translate(offset: Vector3) {
    this.center.add(offset);
    return this;
  }

  equals(sphere: Sphere) {
    return this.center.equals(sphere.center) && this.radius.equals(sphere.radius);
  }

  clone() {
    return new Sphere({ radius: this.radius.clone(), center: this.center.clone() });
  }

  toString() {
    return `Sphere( ${this.radius.toString()}, ${this.center.toString()} )`;
  }

  static empty() {
    return new Sphere({
      radius: Real64.zero,
      center: Vector3.empty(),
    });
  }
    

}