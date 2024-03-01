import { Struct, Bool, Provable } from 'o1js';
import { Real64 } from './Real64.js';
import { Vector3 } from './Vector3.js';
import { Plane } from './Plane.js';

interface Box3Class {
  min: Vector3;
  max: Vector3;
  set: (min: Vector3, max: Vector3) => Box3;
  setFromArray: (array: number[]) => Box3;
  setFromCenterAndSize: (center: Vector3, size: Vector3) => Box3;
  clone: () => Box3;
  copy: (box: Box3) => Box3;
  makeEmpty: () => Box3;
  isEmpty: () => Bool;
  getCenter: (target: Vector3) => Vector3;
  getSize: (target: Vector3) => Vector3;
  expandByVector: (vector: Vector3) => Box3;
  containsPoint: (point: Vector3) => Bool;
  containsBox: (box: Box3) => Bool;
  intersectsBox: (box: Box3) => Bool;
}

export class Box3 extends Struct({
  min: Vector3,
  max: Vector3
}) implements Box3Class {
  constructor(value: {
    min: Vector3,
    max: Vector3
  }) {
    super(value);
  }

  set(min: Vector3, max: Vector3) {
    this.min = min;
    this.max = max;
    return this;
  }

  setFromArray(array: number[]) {
    const min = Vector3.fromNumbers( array[ 0 ], array[ 1 ], array[ 2 ] );
    const max = Vector3.fromNumbers( array[ 3 ], array[ 4 ], array[ 5 ] );
    this.set( min, max );
    return this;
  }

  setFromCenterAndSize(center: Vector3, size: Vector3) {
    const halfSize = size.clone().multiplyScalar( Real64.from( 0.5 ) );
    this.min = center.clone().sub( halfSize );
    this.max = center.clone().add( halfSize );
    return this;
  }

  clone() {
    return new Box3({
      min: this.min.clone(),
      max: this.max.clone(),
    });
  }

  copy(box: Box3) {
    this.min = box.min.clone();
    this.max = box.max.clone();
    return this;
  }

  makeEmpty() {
    this.min = Vector3.empty();
    this.max = Vector3.empty();
    return this;
  }

  isEmpty() {
    return Bool.or(
      this.max.x.magnitudeLessThan( this.min.x ),
      Bool.or(
        this.max.y.magnitudeLessThan( this.min.y ),
        this.max.z.magnitudeLessThan( this.min.z )
      )
    )
  }

  getCenter(target: Vector3) {
    return target.addVectors( this.min, this.max ).multiplyScalar( Real64.from( 0.5 ) );
  }

  getSize(target: Vector3) {
    return target.subVectors( this.max, this.min );
  }

  // TODO: Implement expandByPoint

  expandByVector(vector: Vector3) {
    this.min = this.min.sub(vector);
    this.max = this.max.add(vector);
    return this;
  }

  // TODO: Implement expandByObject
  
  containsPoint(point: Vector3) {
    return Bool.and(
      Bool.and(
        Bool.and(
          point.x.magnitudeGreaterThanOrEqual( this.min.x ),
          point.x.magnitudeLessThanOrEqual( this.max.x )
        ),
        Bool.and(
          point.y.magnitudeGreaterThanOrEqual( this.min.y ),
          point.y.magnitudeLessThanOrEqual( this.max.y )
        )
      ),
      Bool.and(
        point.z.magnitudeGreaterThanOrEqual( this.min.z ),
        point.z.magnitudeLessThanOrEqual( this.max.z )
      )
    );
  }

  containsBox(box: Box3) {
    return Bool.and(
      Bool.and(
        this.min.x.magnitudeLessThanOrEqual( box.min.x ),
        box.max.x.magnitudeLessThanOrEqual( this.max.x )
      ),
      Bool.and(
        Bool.and(
          this.min.y.magnitudeLessThanOrEqual( box.min.y ),
          box.max.y.magnitudeLessThanOrEqual( this.max.y )
        ),
        Bool.and(
          this.min.z.magnitudeLessThanOrEqual( box.min.z ),
          box.max.z.magnitudeLessThanOrEqual( this.max.z )
        )
      )
    );
  }

  intersectsBox(box: Box3) {
    return Bool.and(
      Bool.and(
        Bool.and(
          box.max.x.magnitudeGreaterThanOrEqual( this.min.x ),
          box.min.x.magnitudeLessThanOrEqual( this.max.x )
        ),
        Bool.and(
          box.max.y.magnitudeGreaterThanOrEqual( this.min.y ),
          box.min.y.magnitudeLessThanOrEqual( this.max.y )
        )
      ),
      Bool.and(
        box.max.z.magnitudeGreaterThanOrEqual( this.min.z ),
        box.min.z.magnitudeLessThanOrEqual( this.max.z )
      )
    );
  }

  // TODO: Implement intersectsSphere, intersectsPlane, intersectsTriangle, clampPoint, distanceToPoint, getBoundingSphere, intersect, union, applyMatrix4, translate

  
}