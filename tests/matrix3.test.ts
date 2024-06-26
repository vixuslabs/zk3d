import * as ZK3D from '../src/index';
import * as THREE from 'three';

describe('Matrix3 operations', () => {
  const m1 = [0.001234, 2.345, 0.3456, 23.3, 1.45, 0.001, 0.3, 0.004, 0.005];
  const m2 = [4.567, 0.05678, 6.789, 0.02, 0.03, 0.4, 0.0005, 0.0006, 0.007];

  const m1t = new THREE.Matrix3().fromArray(m1);
  const m2t = new THREE.Matrix3().fromArray(m2);
  const m1z = ZK3D.Matrix3.fromElements(m1.map(x => ZK3D.Real64.from(x)));
  const m2z = ZK3D.Matrix3.fromElements(m2.map(x => ZK3D.Real64.from(x)));

  test('matrix multiplication', () => {
    const threejsResult = m1t.clone().multiply(m2t).toArray();
    const zk3dResult = m1z.clone().multiply(m2z).toArray();
    threejsResult.forEach((val, idx) => {
      expect(zk3dResult[idx].toNumber()).toBeCloseTo(val, 2);
    });
  });

  test('matrix determinant', () => {
    const threejsResult = m1t.determinant();
    const zk3dResult = m1z.determinant().toNumber();
    expect(zk3dResult).toBeCloseTo(threejsResult, 2);
  });

  test('matrix inverse', () => {
    const threejsResult = m1t.clone().invert().toArray();
    const zk3dResult = m1z.clone().invert().toArray();
    threejsResult.forEach((val, idx) => {
      expect(zk3dResult[idx].toNumber()).toBeCloseTo(val, 1);
    });
  });

  test('matrix transpose', () => {
    const threejsResult = m1t.clone().transpose().toArray();
    const zk3dResult = m1z.clone().transpose().toArray();
    threejsResult.forEach((val, idx) => {
      expect(zk3dResult[idx].toNumber()).toBeCloseTo(val, 4);
    });
  });

  test('matrix from scale', () => {
    const scale = [0.1, 0.2];
    const threejsResult = new THREE.Matrix3().makeScale(scale[0], scale[1]).toArray();
    const zk3dResult = ZK3D.Matrix3.makeScale(ZK3D.Real64.from(scale[0]), ZK3D.Real64.from(scale[1])).toArray();
    threejsResult.forEach((val, idx) => {
      expect(zk3dResult[idx].toNumber()).toBeCloseTo(val, 4);
    });
  });

  test('matrix from elements', () => {
    const zk3dResult = ZK3D.Matrix3.fromElements(m1.map(x => ZK3D.Real64.from(x))).toArray();
    m1.forEach((val, idx) => {
      expect(zk3dResult[idx].toNumber()).toBeCloseTo(val, 2);
    });
  });
});
