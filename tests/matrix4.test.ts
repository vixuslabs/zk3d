import * as ZK3D from '../src/index';
import * as THREE from 'three';

const round = (x: number, precision: number) => Math.round(x * Math.pow(10, precision)) / Math.pow(10, precision);

describe('Matrix4 operations', () => {
  const m1 = [0.01234, 2.345, 0.3456, 0.0738, 3.3, 1.45, 0.01, 0.02, 0.3, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 10];
  const m2 = [4.567, 0.0567, 6.789, 0.01, 0.02, 0.03, 0.4, 5, 0.06, 0.07, 0.08, 9, 0.010, 0.11, 0.02, 0.013];

  const m1t = new THREE.Matrix4().fromArray(m1);
  const m2t = new THREE.Matrix4().fromArray(m2);
  const m1z = ZK3D.Matrix4.fromElements(m1.map(x => ZK3D.Real64.from(x)));
  const m2z = ZK3D.Matrix4.fromElements(m2.map(x => ZK3D.Real64.from(x)));

  test('matrix multiplication', () => {
    const threejsResult = m1t.clone().multiply(m2t);
    const threejsResultArray = threejsResult.toArray().map(x => round(x, 2));
    const zk3dResult = m1z.clone().multiply(m2z);
    const zk3dResultArray = zk3dResult.toArray().map(x => round(x.toNumber(), 2));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('matrix determinant', () => {
    const threejsResult = m1t.determinant();
    const zk3dResult = m1z.determinant();
    expect(round(threejsResult, 1)).toEqual(round(zk3dResult.toNumber(), 1));
  });

  test('matrix inverse', () => {
    const threejsResult = m1t.clone().invert();
    const threejsResultArray = threejsResult.toArray().map(x => round(x, 1));
    const zk3dResult = m1z.clone().invert();
    const zk3dResultArray = zk3dResult.toArray().map(x => round(x.toNumber(), 1));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('matrix transpose', () => {
    const threejsResult = m1t.clone().transpose();
    const threejsResultArray = threejsResult.toArray().map(x => round(x, 4));
    const zk3dResult = m1z.clone().transpose();
    const zk3dResultArray = zk3dResult.toArray().map(x => round(x.toNumber(), 4));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('matrix from scale', () => {
    const scale = [0.1, 0.2, 0.3];
    const threejsResult = new THREE.Matrix4().makeScale(scale[0], scale[1], scale[2]);
    const threejsResultArray = threejsResult.toArray().map(x => round(x, 4));
    const zk3dResult = ZK3D.Matrix4.makeScale(ZK3D.Real64.from(scale[0]), ZK3D.Real64.from(scale[1]), ZK3D.Real64.from(scale[2]));
    const zk3dResultArray = zk3dResult.toArray().map(x => round(x.toNumber(), 4));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('matrix from elements', () => {
    const threejsResult = new THREE.Matrix4().set(
      m1[0], m1[4], m1[8], m1[12],
      m1[1], m1[5], m1[9], m1[13],
      m1[2], m1[6], m1[10], m1[14],
      m1[3], m1[7], m1[11], m1[15]
    );
    const threejsResultArray = threejsResult.toArray().map(x => round(x, 4));
    const zk3dResult = ZK3D.Matrix4.fromElements(m1.map(x => ZK3D.Real64.from(x)));
    const zk3dResultArray = zk3dResult.toArray().map(x => round(x.toNumber(), 4));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

});