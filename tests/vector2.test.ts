import * as ZK3D from '../src/index';
import * as THREE from 'three';

const round = (x: number, precision: number) => Math.round(x * Math.pow(10, precision)) / Math.pow(10, precision);

describe('Vector2 operations', () => {
  const v1 = [0.01234, 2.345];
  const v2 = [4.567, 0.05678];

  const v1t = new THREE.Vector2(v1[0], v1[1]);
  const v2t = new THREE.Vector2(v2[0], v2[1]);
  const v1z = ZK3D.Vector2.fromNumbers(v1[0], v1[1]);
  const v2z = ZK3D.Vector2.fromNumbers(v2[0], v2[1]);

  test('vector addition', () => {
    const threejsResult = v1t.clone().add(v2t);
    const threejsResultArray = [threejsResult.x, threejsResult.y].map(x => round(x, 4));
    const zk3dResult = v1z.clone().add(v2z);
    const zk3dResultArray = [zk3dResult.x.toNumber(), zk3dResult.y.toNumber()].map(x => round(x, 4));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('vector subtraction', () => {
    const threejsResult = v1t.clone().sub(v2t);
    const threejsResultArray = [threejsResult.x, threejsResult.y].map(x => round(x, 4));
    const zk3dResult = v1z.clone().sub(v2z);
    const zk3dResultArray = [zk3dResult.x.toNumber(), zk3dResult.y.toNumber()].map(x => round(x, 4));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('vector multiplication', () => {
    const threejsResult = v1t.clone().multiply(v2t);
    const threejsResultArray = [threejsResult.x, threejsResult.y].map(x => round(x, 3));
    const zk3dResult = v1z.clone().multiply(v2z);
    const zk3dResultArray = [zk3dResult.x.toNumber(), zk3dResult.y.toNumber()].map(x => round(x, 3));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('multiplication by scalar', () => {
    const scalar = 3;
    const threejsResult = v1t.clone().multiplyScalar(scalar);
    const threejsResultArray = [threejsResult.x, threejsResult.y].map(x => round(x, 3));
    const zk3dResult = v1z.clone().multiplyScalar(ZK3D.Real64.from(scalar));
    const zk3dResultArray = [zk3dResult.x.toNumber(), zk3dResult.y.toNumber()].map(x => round(x, 3));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('dot product', () => {
    const threejsResult = v1t.dot(v2t);
    const zk3dResult = v1z.clone().dot(v2z);
    expect(round(threejsResult, 2)).toEqual(round(zk3dResult.toNumber(), 2));
  });

  // test('cross product', () => {
  //   const threejsResult = v1t.clone().cross(v2t);
  //   const threejsResultArray = [threejsResult.x, threejsResult.y].map(x => round(x, 3));
  //   const zk3dResult = v1z.clone().cross(v2z);
  //   const zk3dResultArray = [zk3dResult.x.toNumber(), zk3dResult.y.toNumber()].map(x => round(x, 3));
  //   expect(threejsResultArray).toEqual(zk3dResultArray);
  // });

  test('length squared', () => {
    const threejsResult = v1t.lengthSq();
    const zk3dResult = v1z.clone().lengthSq();
    expect(round(threejsResult, 3)).toEqual(round(zk3dResult.toNumber(), 3));
  });

  test('distanceToSquared', () => {
    const threejsResult = v1t.distanceToSquared(v2t);
    const zk3dResult = v1z.clone().distanceToSquared(v2z);
    expect(round(threejsResult, 3)).toEqual(round(zk3dResult.toNumber(), 3));
  });

  test('lerp', () => {
    const alpha = 0.5;
    const threejsResult = v1t.clone().lerp(v2t, alpha);
    const threejsResultArray = [threejsResult.x, threejsResult.y].map(x => round(x, 3));
    const zk3dResult = v1z.clone().lerp(v2z, ZK3D.Real64.from(alpha));
    const zk3dResultArray = [zk3dResult.x.toNumber(), zk3dResult.y.toNumber()].map(x => round(x, 3));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('lerpVectors', () => {
    const alpha = 0.5;
    const threejsResult = v1t.clone().lerpVectors(v2t, v1t, alpha);
    const threejsResultArray = [threejsResult.x, threejsResult.y].map(x => round(x, 4));
    const zk3dResult = v1z.clone().lerpVectors(v2z, v1z, ZK3D.Real64.from(alpha));
    const zk3dResultArray = [zk3dResult.x.toNumber(), zk3dResult.y.toNumber()].map(x => round(x, 4));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('negate', () => {
    const threejsResult = v1t.clone().negate();
    const threejsResultArray = [threejsResult.x, threejsResult.y].map(x => round(x, 4));
    const zk3dResult = v1z.clone().negate();
    const zk3dResultArray = [zk3dResult.x.toNumber(), zk3dResult.y.toNumber()].map(x => round(x, 4));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('divide', () => {
    const threejsResult = v1t.clone().divide(v2t);
    const threejsResultArray = [threejsResult.x, threejsResult.y].map(x => round(x, 1));
    const zk3dResult = v1z.clone().divide(v2z);
    const zk3dResultArray = [zk3dResult.x.toNumber(), zk3dResult.y.toNumber()].map(x => round(x, 1));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('divideScalar', () => {
    const scalar = 3;
    const threejsResult = v1t.clone().divideScalar(scalar);
    const threejsResultArray = [threejsResult.x, threejsResult.y].map(x => round(x, 3));
    const zk3dResult = v1z.clone().divideScalar(ZK3D.Real64.from(scalar));
    const zk3dResultArray = [zk3dResult.x.toNumber(), zk3dResult.y.toNumber()].map(x => round(x, 3));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

});





