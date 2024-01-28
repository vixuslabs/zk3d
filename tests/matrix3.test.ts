import * as ZK3D from '../src/index';
import * as THREE from 'three';

const round = (x: number, precision: number) => Math.round(x * Math.pow(10, precision)) / Math.pow(10, precision);

describe('Matrix3 operations', () => {
  const m1 = [0.001234, 2.345, 0.3456, 23.3, 1.45, 0.001, 0.3, 0.004, 0.005];
  const m2 = [4.567, 0.05678, 6.789, 0.02, 0.03, 0.4, 0.0005, 0.0006, 0.007];

  const m1t = new THREE.Matrix3().fromArray(m1);
  const m2t = new THREE.Matrix3().fromArray(m2);
  const m1z = ZK3D.Matrix3.fromElements(m1.map(x => ZK3D.Real64.from(x)));
  const m2z = ZK3D.Matrix3.fromElements(m2.map(x => ZK3D.Real64.from(x)));

  test('matrix multiplication', () => {
    const threejsResult = m1t.clone().multiply(m2t);
    const threejsResultArray = threejsResult.toArray().map(x => round(x, 4));
    const zk3dResult = m1z.clone().multiply(m2z);
    const zk3dResultArray = zk3dResult.toArray().map(x => round(x.toNumber(), 4));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('matrix determinant', () => {
    const threejsResult = m1t.determinant();
    const zk3dResult = m1z.determinant();
    expect(round(threejsResult, 4)).toEqual(round(zk3dResult.toNumber(), 4));
  });

  test('matrix inverse', () => {
    const threejsResult = m1t.clone().invert();
    const threejsResultArray = threejsResult.toArray().map(x => round(x, 4));
    const zk3dResult = m1z.clone().invert();
    const zk3dResultArray = zk3dResult.toArray().map(x => round(x.toNumber(), 4));
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
    const scale = [0.1, 0.2];
    const threejsResult = new THREE.Matrix3().makeScale(scale[0], scale[1]);
    const threejsResultArray = threejsResult.toArray().map(x => round(x, 4));
    const zk3dResult = ZK3D.Matrix3.makeScale(s);
    const zk3dResultArray = zk3dResult.toArray().map(x => round(x.toNumber(), 4));
    expect(threejsResultArray).toEqual(zk3dResultArray);
  });

  test('matrix from elements', () => {
    const zk3dResult = ZK3D.Matrix3.fromElements(m1.map(x => ZK3D.Real64.from(x)));
    const zk3dResultArray = zk3dResult.toArray().map(x => round(x.toNumber(), 4));
    expect(m1).toEqual(zk3dResultArray);
  });
});
