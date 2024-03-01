import * as ZK3D from '../src/index';
import * as THREE from 'three';

describe('Plane operations', () => {
  const normal = [0, 1, 0];
  const constant = -5;
  const pointOnPlane = [1, 5, 2];

  const zkPlane = new ZK3D.Plane({
    normal: ZK3D.Vector3.fromNumbers(normal[0], normal[1], normal[2]),
    constant: ZK3D.Real64.from(constant),
  });
  const threePlane = new THREE.Plane(new THREE.Vector3(...normal), constant);

  test('set from normal and coplanar point', () => {
    const coplanarPointZ = ZK3D.Vector3.fromNumbers(pointOnPlane[0], pointOnPlane[1], pointOnPlane[2]);
    zkPlane.setFromNormalAndCoplanarPoint(zkPlane.normal, coplanarPointZ);
    threePlane.setFromNormalAndCoplanarPoint(threePlane.normal, new THREE.Vector3(...pointOnPlane));

    expect(zkPlane.normal.toArray()).toEqual([threePlane.normal.x, threePlane.normal.y, threePlane.normal.z]);
    expect(zkPlane.constant.toNumber()).toBeCloseTo(threePlane.constant);
  });

  test('clone and copy', () => {
    const clonedPlaneZ = zkPlane.clone();
    const copiedPlaneZ = new ZK3D.Plane({ normal: ZK3D.Vector3.empty(), constant: ZK3D.Real64.zero }).copy(zkPlane);

    const clonedPlaneT = threePlane.clone();
    const copiedPlaneT = new THREE.Plane().copy(threePlane);

    expect(clonedPlaneZ.normal.toArray()).toEqual([clonedPlaneT.normal.x, clonedPlaneT.normal.y, clonedPlaneT.normal.z]);
    expect(clonedPlaneZ.constant.toNumber()).toBeCloseTo(clonedPlaneT.constant);
    expect(copiedPlaneZ.normal.toArray()).toEqual([copiedPlaneT.normal.x, copiedPlaneT.normal.y, copiedPlaneT.normal.z]);
    expect(copiedPlaneZ.constant.toNumber()).toBeCloseTo(copiedPlaneT.constant);
  });

  test('distance to point', () => {
    const testPoint = [1, 10, 2]; // Point above the plane
    const zkPoint = ZK3D.Vector3.fromNumbers(testPoint[0], testPoint[1], testPoint[2]);
    const threePoint = new THREE.Vector3(...testPoint);

    expect(zkPlane.distanceToPoint(zkPoint).toNumber()).toBeCloseTo(threePlane.distanceToPoint(threePoint));
  });

  test('project point', () => {
    const testPoint = [3, 7, 4]; // Arbitrary point for projection
    const zkPoint = ZK3D.Vector3.fromNumbers(testPoint[0], testPoint[1], testPoint[2]);
    const threePoint = new THREE.Vector3(testPoint[0], testPoint[1], testPoint[2]);
  
    const targetZkPoint = ZK3D.Vector3.empty();
    const targetThreePoint = new THREE.Vector3();
  
    zkPlane.projectPoint(zkPoint, targetZkPoint);
    threePlane.projectPoint(threePoint, targetThreePoint);
  
    expect(targetZkPoint.x.toNumber()).toBeCloseTo(targetThreePoint.x);
    expect(targetZkPoint.y.toNumber()).toBeCloseTo(targetThreePoint.y);
    expect(targetZkPoint.z.toNumber()).toBeCloseTo(targetThreePoint.z);
  });
  

});
