import * as ZK3D from '../src/index';
import * as THREE from 'three';

describe('Vector3 operations', () => {
  const v1 = [0.001234, 2.345, 0.3456];
  const v2 = [4.567, 0.05678, 6.789];
  
  const v1t = new THREE.Vector3(v1[0], v1[1], v1[2]);
  const v2t = new THREE.Vector3(v2[0], v2[1], v2[2]);
  const v1z = ZK3D.Vector3.fromNumbers(v1[0], v1[1], v1[2]);
  const v2z = ZK3D.Vector3.fromNumbers(v2[0], v2[1], v2[2]);

  test('vector addition', () => {
    const threejsResult = v1t.clone().add(v2t);
    const zk3dResult = v1z.clone().add(v2z);
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 4);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 4);
    expect(zk3dResult.z.toNumber()).toBeCloseTo(threejsResult.z, 4);
  });

  test('vector subtraction', () => {
    const threejsResult = v1t.clone().sub(v2t);
    const zk3dResult = v1z.clone().sub(v2z);
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 4);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 4);
    expect(zk3dResult.z.toNumber()).toBeCloseTo(threejsResult.z, 4);
  });

  test('vector multiplication', () => {
    const threejsResult = v1t.clone().multiply(v2t);
    const zk3dResult = v1z.clone().multiply(v2z);
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 2);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 2);
    expect(zk3dResult.z.toNumber()).toBeCloseTo(threejsResult.z, 2);
  });

  test('multiplication by scalar', () => {
    const scalar = 3;
    const threejsResult = v1t.clone().multiplyScalar(scalar);
    const zk3dResult = v1z.clone().multiplyScalar(ZK3D.Real64.from(scalar));
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 3);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 3);
    expect(zk3dResult.z.toNumber()).toBeCloseTo(threejsResult.z, 3);
  });

  test('dot product', () => {
    const threejsResult = v1t.clone().dot(v2t);
    const zk3dResult = v1z.clone().dot(v2z);
    expect(zk3dResult.toNumber()).toBeCloseTo(threejsResult, 1);
  });

  test('cross product', () => {
    const threejsResult = v1t.clone().cross(v2t);
    const zk3dResult = v1z.clone().cross(v2z);
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 3);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 3);
    expect(zk3dResult.z.toNumber()).toBeCloseTo(threejsResult.z, 3);
  });

  test('length squared', () => {
    const threejsResult = v1t.clone().lengthSq();
    const zk3dResult = v1z.clone().lengthSq().toNumber();
    expect(zk3dResult).toBeCloseTo(threejsResult, 3);
  });

  test('distanceToSquared', () => {
    const threejsResult = v1t.clone().distanceToSquared(v2t);
    const zk3dResult = v1z.clone().distanceToSquared(v2z).toNumber();
    expect(zk3dResult).toBeCloseTo(threejsResult, 3);
  });

  test('lerp', () => {
    const alpha = 0.5;
    const threejsResult = v1t.clone().lerp(v2t, alpha);
    const zk3dResult = v1z.clone().lerp(v2z, ZK3D.Real64.from(alpha));
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 3);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 3);
    expect(zk3dResult.z.toNumber()).toBeCloseTo(threejsResult.z, 3);
  });

  test('lerpVectors', () => {
    const alpha = 0.5;
    const threejsResult = v1t.clone().lerpVectors(v2t, v1t, alpha);
    const zk3dResult = v1z.clone().lerpVectors(v2z, v1z, ZK3D.Real64.from(alpha));
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 3);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 3);
    expect(zk3dResult.z.toNumber()).toBeCloseTo(threejsResult.z, 3);
  });

  test('negate', () => {
    const threejsResult = v1t.clone().negate();
    const zk3dResult = v1z.clone().negate();
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 3);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 3);
    expect(zk3dResult.z.toNumber()).toBeCloseTo(threejsResult.z, 3);
  });

  test('divide', () => {
    const threejsResult = v1t.clone().divide(v2t);
    const zk3dResult = v1z.clone().divide(v2z);
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 1);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 1);
    expect(zk3dResult.z.toNumber()).toBeCloseTo(threejsResult.z, 1);
  });

  test('divideScalar', () => {
    const scalar = 3;
    const threejsResult = v1t.clone().divideScalar(scalar);
    const zk3dResult = v1z.clone().divideScalar(ZK3D.Real64.from(scalar));
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 3);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 3);
    expect(zk3dResult.z.toNumber()).toBeCloseTo(threejsResult.z, 3);
  });

});

