import * as ZK3D from '../src/index';
import * as THREE from 'three';

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

    const zk3dCenter = zk3dBox.getCenter(ZK3D.Vector3.empty());
    const zk3dSize = zk3dBox.getSize(ZK3D.Vector3.empty());
    const threeCenter = threeBox.getCenter(new THREE.Vector3());
    const threeSize = threeBox.getSize(new THREE.Vector3());

    expect(zk3dCenter.x.toNumber()).toBeCloseTo(threeCenter.x, 4);
    expect(zk3dCenter.y.toNumber()).toBeCloseTo(threeCenter.y, 4);
    expect(zk3dCenter.z.toNumber()).toBeCloseTo(threeCenter.z, 4);
    expect(zk3dSize.x.toNumber()).toBeCloseTo(threeSize.x, 4);
    expect(zk3dSize.y.toNumber()).toBeCloseTo(threeSize.y, 4);
    expect(zk3dSize.z.toNumber()).toBeCloseTo(threeSize.z, 4);
  });

  test('clone and copy', () => {
    const clonedBoxZ = zk3dBox.clone();
    const copiedBoxZ = new ZK3D.Box3({ min: ZK3D.Vector3.empty(), max: ZK3D.Vector3.empty() }).copy(zk3dBox);
  
    const threeClonedBox = threeBox.clone();
    const threeCopiedBox = new THREE.Box3().copy(threeBox);

    // Clone assertions
    expect(clonedBoxZ.min.x.toNumber()).toBeCloseTo(threeClonedBox.min.x, 4);
    expect(clonedBoxZ.min.y.toNumber()).toBeCloseTo(threeClonedBox.min.y, 4);
    expect(clonedBoxZ.min.z.toNumber()).toBeCloseTo(threeClonedBox.min.z, 4);
    expect(clonedBoxZ.max.x.toNumber()).toBeCloseTo(threeClonedBox.max.x, 4);
    expect(clonedBoxZ.max.y.toNumber()).toBeCloseTo(threeClonedBox.max.y, 4);
    expect(clonedBoxZ.max.z.toNumber()).toBeCloseTo(threeClonedBox.max.z, 4);

    // Copy assertions
    expect(copiedBoxZ.min.x.toNumber()).toBeCloseTo(threeCopiedBox.min.x, 4);
    expect(copiedBoxZ.min.y.toNumber()).toBeCloseTo(threeCopiedBox.min.y, 4);
    expect(copiedBoxZ.min.z.toNumber()).toBeCloseTo(threeCopiedBox.min.z, 4);
    expect(copiedBoxZ.max.x.toNumber()).toBeCloseTo(threeCopiedBox.max.x, 4);
    expect(copiedBoxZ.max.y.toNumber()).toBeCloseTo(threeCopiedBox.max.y, 4);
    expect(copiedBoxZ.max.z.toNumber()).toBeCloseTo(threeCopiedBox.max.z, 4);
  });

  test('expand by vector', () => {
    const expandVectorZ = ZK3D.Vector3.fromNumbers(0.5, 0.5, 0.5);
    zk3dBox.expandByVector(expandVectorZ);
    threeBox.expandByVector(new THREE.Vector3(0.5, 0.5, 0.5));
  
    expect(zk3dBox.min.x.toNumber()).toBeCloseTo(threeBox.min.x, 4);
    expect(zk3dBox.min.y.toNumber()).toBeCloseTo(threeBox.min.y, 4);
    expect(zk3dBox.min.z.toNumber()).toBeCloseTo(threeBox.min.z, 4);
    expect(zk3dBox.max.x.toNumber()).toBeCloseTo(threeBox.max.x, 4);
    expect(zk3dBox.max.y.toNumber()).toBeCloseTo(threeBox.max.y, 4);
    expect(zk3dBox.max.z.toNumber()).toBeCloseTo(threeBox.max.z, 4);
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
  
