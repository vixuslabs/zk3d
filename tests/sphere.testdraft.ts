import * as ZK3D from '../src/index';
import * as THREE from 'three';

describe('Sphere operations', () => {
  const radius = 5;
  const center = [1, 2, 3];

  const zkSphere = ZK3D.Sphere.fromNumbers(radius, center[0], center[1], center[2]);
  const threeSphere = new THREE.Sphere(new THREE.Vector3(...center), radius);

  test('set and copy', () => {
    const newRadius = 10;
    const newCenter = [4, 5, 6];
    zkSphere.set(ZK3D.Real64.from(newRadius), ZK3D.Vector3.fromNumbers(newCenter[0], newCenter[1], newCenter[2]));
    threeSphere.set(new THREE.Vector3(...newCenter), newRadius);

    const zkSphereCopy = ZK3D.Sphere.empty().copy(zkSphere);
    const threeSphereCopy = new THREE.Sphere().copy(threeSphere);

    expect(zkSphereCopy.radius.toNumber()).toBeCloseTo(threeSphereCopy.radius);
    expect(zkSphereCopy.center.x.toNumber()).toBeCloseTo(threeSphereCopy.center.x);
    expect(zkSphereCopy.center.y.toNumber()).toBeCloseTo(threeSphereCopy.center.y);
    expect(zkSphereCopy.center.z.toNumber()).toBeCloseTo(threeSphereCopy.center.z);
  });

  test('contains point', () => {
    const point = [3, 3, 3];
    const zkPoint = ZK3D.Vector3.fromNumbers(point[0], point[1], point[2]);
    const threePoint = new THREE.Vector3(...point);

    const insideZk = zkSphere.containsPoint(zkPoint).toBoolean();
    const insideThree = threeSphere.containsPoint(threePoint);

    expect(insideZk).toEqual(insideThree);
  });

  test('distance squared to point', () => {
    const point = [10, 10, 10]; // Outside the sphere
    const zkPoint = ZK3D.Vector3.fromNumbers(point[0], point[1], point[2]);
    const threePoint = new THREE.Vector3(...point);

    const distanceZk = zkSphere.distanceSquaredToPoint(zkPoint).toNumber();
    const distanceThree = threeSphere.distanceToPoint(threePoint) ** 2; // THREE.js provides distance, not squared distance

    expect(distanceZk).toBeCloseTo(distanceThree);
  });

  test('intersects sphere', () => {
    const otherSphereCenter = [10, 10, 10];
    const otherSphereRadius = 5;
    const zkOtherSphere = ZK3D.Sphere.fromNumbers(otherSphereRadius, otherSphereCenter[0], otherSphereCenter[1], otherSphereCenter[2]);
    const threeOtherSphere = new THREE.Sphere(new THREE.Vector3(...otherSphereCenter), otherSphereRadius);

    const intersectsZk = zkSphere.intersectsSphere(zkOtherSphere).toBoolean();
    const intersectsThree = threeSphere.intersectsSphere(threeOtherSphere);

    expect(intersectsZk).toEqual(intersectsThree);
  });

  test('intersects plane', () => {
    const planeNormal = [0, 1, 0];
    const planeConstant = -5;
    const zkPlane = new ZK3D.Plane({
      normal: ZK3D.Vector3.fromNumbers(planeNormal[0], planeNormal[1], planeNormal[2]),
      constant: ZK3D.Real64.from(planeConstant),
    });
    const threePlane = new THREE.Plane(new THREE.Vector3(...planeNormal), planeConstant);

    const intersectsZk = zkSphere.intersectsPlane(zkPlane).toBoolean();
    const intersectsThree = threeSphere.intersectsPlane(threePlane);

    expect(intersectsZk).toEqual(intersectsThree);
  });

  test('translate', () => {
    const offset = [1, 1, 1];
    zkSphere.translate(ZK3D.Vector3.fromNumbers(offset[0], offset[1], offset[2]));
    threeSphere.translate(new THREE.Vector3(...offset));

    expect(zkSphere.center.x.toNumber()).toBeCloseTo(threeSphere.center.x);
    expect(zkSphere.center.y.toNumber()).toBeCloseTo(threeSphere.center.y);
    expect(zkSphere.center.z.toNumber()).toBeCloseTo(threeSphere.center.z);
  });

});