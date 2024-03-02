import * as ZK3D from '../src/index';
import * as THREE from 'three';

describe('Matrix4 operations', () => {
  const m1 = [0.01234, 2.345, 0.3456, 0.0738, 3.3, 1.45, 0.01, 0.02, 0.3, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 10];
  const m2 = [4.567, 0.0567, 6.789, 0.01, 0.02, 0.03, 0.4, 5, 0.06, 0.07, 0.08, 9, 0.010, 0.11, 0.02, 0.013];

  const m1t = new THREE.Matrix4().fromArray(m1);
  const m2t = new THREE.Matrix4().fromArray(m2);
  const m1z = ZK3D.Matrix4.fromElements(m1.map(x => ZK3D.Real64.from(x)));
  const m2z = ZK3D.Matrix4.fromElements(m2.map(x => ZK3D.Real64.from(x)));

  test('matrix multiplication', () => {
    const threejsResult = m1t.clone().multiply(m2t);
    const zk3dResult = m1z.clone().multiply(m2z);
    threejsResult.toArray().forEach((value, index) => {
      expect(zk3dResult.toArray()[index].toNumber()).toBeCloseTo(value, 2);
    });
  });

  test('matrix determinant', () => {
    const threejsResult = m1t.determinant();
    const zk3dResult = m1z.determinant().toNumber();
    expect(zk3dResult).toBeCloseTo(threejsResult, 1);
  });

  test('matrix inverse', () => {
    const threejsResult = m1t.clone().invert();
    const zk3dResult = m1z.clone().invert();
    threejsResult.toArray().forEach((value, index) => {
      expect(zk3dResult.toArray()[index].toNumber()).toBeCloseTo(value, 1);
    });
  });

  test('matrix transpose', () => {
    const threejsResult = m1t.clone().transpose();
    const zk3dResult = m1z.clone().transpose();
    threejsResult.toArray().forEach((value, index) => {
      expect(zk3dResult.toArray()[index].toNumber()).toBeCloseTo(value, 4);
    });
  });

  test('matrix from scale', () => {
    const scale = [0.1, 0.2, 0.3];
    const threejsResult = new THREE.Matrix4().makeScale(scale[0], scale[1], scale[2]);
    const zk3dResult = ZK3D.Matrix4.makeScale(ZK3D.Real64.from(scale[0]), ZK3D.Real64.from(scale[1]), ZK3D.Real64.from(scale[2]));
    threejsResult.toArray().forEach((value, index) => {
      expect(zk3dResult.toArray()[index].toNumber()).toBeCloseTo(value, 4);
    });
  });

  test('matrix from elements', () => {
    const zk3dResult = ZK3D.Matrix4.fromElements(m1.map(x => ZK3D.Real64.from(x)));
    m1.forEach((value, index) => {
      expect(zk3dResult.toArray()[index].toNumber()).toBeCloseTo(value, 4);
    });
  });
});
