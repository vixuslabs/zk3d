import * as ZK3D from '../src/index';
import * as THREE from 'three';

const roundZk3dVector = (vector: ZK3D.Vector3, precision: number) => {
  return {
    x: round(vector.x.toNumber(), precision),
    y: round(vector.y.toNumber(), precision),
    z: round(vector.z.toNumber(), precision)
  };
};

const roundThreeVector = (vector: THREE.Vector3, precision: number) => {
  return {
    x: round(vector.x, precision),
    y: round(vector.y, precision),
    z: round(vector.z, precision)
  };
};

const round = (x: number, precision: number) => Math.round(x * Math.pow(10, precision)) / Math.pow(10, precision);

describe('Box3 operations', () => {
  const min = [0, 0, 0];
  const max = [1, 1, 1];
  const center = [0.5, 0.5, 0.5];
  const size = [1, 1, 1];

  const minVectorZ = ZK3D.Vector3.fromNumbers(min[0], min[1], min[2]);
  const maxVectorZ = ZK3D.Vector3.fromNumbers(max[0], max[1], max[2]);
  const centerVectorZ = ZK3D.Vector3.fromNumbers(center[0], center[1], center[2]);
  const sizeVectorZ = ZK3D.Vector3.fromNumbers(size[0], size[1], size[2]);
  const zk3dBox = new ZK3D.Box3({ min: minVectorZ, max: maxVectorZ });

  const minVectorT = new THREE.Vector3(...min);
  const maxVectorT = new THREE.Vector3(...max);
  const centerVectorT = new THREE.Vector3(...center);
  const sizeVectorT = new THREE.Vector3(...size);
  const threeBox = new THREE.Box3(minVectorT, maxVectorT);

  test('set from center and size', () => {
    zk3dBox.setFromCenterAndSize(centerVectorZ, sizeVectorZ);
    threeBox.setFromCenterAndSize(centerVectorT, sizeVectorT);

    expect(roundZk3dVector(zk3dBox.getCenter(ZK3D.Vector3.empty()), 4)).toEqual(roundThreeVector(threeBox.getCenter(new THREE.Vector3()), 4));
    expect(roundZk3dVector(zk3dBox.getSize(ZK3D.Vector3.empty()), 4)).toEqual(roundThreeVector(threeBox.getSize(new THREE.Vector3()), 4));
  });

  test('clone and copy', () => {
    const clonedBoxZ = zk3dBox.clone();
    const copiedBoxZ = new ZK3D.Box3({ min: ZK3D.Vector3.empty(), max: ZK3D.Vector3.empty() }).copy(zk3dBox);
  
    const threeClonedBox = threeBox.clone();
    const threeCopiedBox = new THREE.Box3().copy(threeBox);
  
    expect(roundZk3dVector(clonedBoxZ.min, 4)).toEqual(roundThreeVector(threeClonedBox.min, 4));
    expect(roundZk3dVector(clonedBoxZ.max, 4)).toEqual(roundThreeVector(threeClonedBox.max, 4));
    expect(roundZk3dVector(copiedBoxZ.min, 4)).toEqual(roundThreeVector(threeCopiedBox.min, 4));
    expect(roundZk3dVector(copiedBoxZ.max, 4)).toEqual(roundThreeVector(threeCopiedBox.max, 4));
  });

  test('expand by vector', () => {
    const expandVectorZ = ZK3D.Vector3.fromNumbers(0.5, 0.5, 0.5);
    zk3dBox.expandByVector(expandVectorZ);
    threeBox.expandByVector(new THREE.Vector3(0.5, 0.5, 0.5));
  
    expect(roundZk3dVector(zk3dBox.min, 4)).toEqual(roundThreeVector(threeBox.min, 4));
    expect(roundZk3dVector(zk3dBox.max, 4)).toEqual(roundThreeVector(threeBox.max, 4));
  });

  test('contains point', () => {
    const pointZ = ZK3D.Vector3.fromNumbers(0.5, 0.5, 0.5);
    const threePoint = new THREE.Vector3(0.5, 0.5, 0.5);
    expect(zk3dBox.containsPoint(pointZ).toBoolean()).toEqual(threeBox.containsPoint(threePoint));
  });

  test('intersects box', () => {
    const otherBoxZ = new ZK3D.Box3({
      min: ZK3D.Vector3.fromNumbers(0.5, 0.5, 0.5),
      max: ZK3D.Vector3.fromNumbers(1.5, 1.5, 1.5)
    });
    const threeOtherBox = new THREE.Box3(
      new THREE.Vector3(0.5, 0.5, 0.5),
      new THREE.Vector3(1.5, 1.5, 1.5)
    );

    expect(zk3dBox.intersectsBox(otherBoxZ).toBoolean()).toEqual(threeBox.intersectsBox(threeOtherBox));
    });
});
