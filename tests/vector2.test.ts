import * as ZK3D from '../src/index';
import * as THREE from 'three';

describe('Vector2 operations', () => {
  const v1 = [0.01234, 2.345];
  const v2 = [4.567, 0.05678];

  const v1t = new THREE.Vector2(v1[0], v1[1]);
  const v2t = new THREE.Vector2(v2[0], v2[1]);
  const v1z = ZK3D.Vector2.fromNumbers(v1[0], v1[1]);
  const v2z = ZK3D.Vector2.fromNumbers(v2[0], v2[1]);

  test('vector addition', () => {
    const threejsResult = v1t.clone().add(v2t);
    const zk3dResult = v1z.clone().add(v2z);
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 4);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 4);
  });

  test('vector subtraction', () => {
    const threejsResult = v1t.clone().sub(v2t);
    const zk3dResult = v1z.clone().sub(v2z);
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 4);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 4);
  });

  test('vector multiplication', () => {
    const threejsResult = v1t.clone().multiply(v2t);
    const zk3dResult = v1z.clone().multiply(v2z);
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 3);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 3);
  });

  test('multiplication by scalar', () => {
    const scalar = 3;
    const threejsResult = v1t.clone().multiplyScalar(scalar);
    const zk3dResult = v1z.clone().multiplyScalar(ZK3D.Real64.from(scalar));
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 3);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 3);
  });

  test('dot product', () => {
    const threejsResult = v1t.dot(v2t);
    const zk3dResult = v1z.dot(v2z).toNumber();
    expect(zk3dResult).toBeCloseTo(threejsResult, 2);
  });

  test('length squared', () => {
    const threejsResult = v1t.lengthSq();
    const zk3dResult = v1z.lengthSq().toNumber();
    expect(zk3dResult).toBeCloseTo(threejsResult, 3);
  });

  test('distanceToSquared', () => {
    const threejsResult = v1t.distanceToSquared(v2t);
    const zk3dResult = v1z.distanceToSquared(v2z).toNumber();
    expect(zk3dResult).toBeCloseTo(threejsResult, 3);
  });

  test('lerp', () => {
    const alpha = 0.5;
    const threejsResult = v1t.clone().lerp(v2t, alpha);
    const zk3dResult = v1z.clone().lerp(v2z, ZK3D.Real64.from(alpha));
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 3);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 3);
  });

  test('lerpVectors', () => {
    const alpha = 0.5;
    const threejsResult = v1t.clone().lerpVectors(v2t, v1t, alpha);
    const zk3dResult = v1z.clone().lerpVectors(v2z, v1z, ZK3D.Real64.from(alpha));
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 4);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 4);
  });

  test('negate', () => {
    const threejsResult = v1t.clone().negate();
    const zk3dResult = v1z.clone().negate();
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 3);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 3);
  });
  

  test('divide', () => {
    const threejsResult = v1t.clone().divide(v2t);
    const zk3dResult = v1z.clone().divide(v2z);
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 1);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 1);
  });

  test('divideScalar', () => {
    const scalar = 3;
    const threejsResult = v1t.clone().divideScalar(scalar);
    const zk3dResult = v1z.clone().divideScalar(ZK3D.Real64.from(scalar));
    expect(zk3dResult.x.toNumber()).toBeCloseTo(threejsResult.x, 3);
    expect(zk3dResult.y.toNumber()).toBeCloseTo(threejsResult.y, 3);
  });

});