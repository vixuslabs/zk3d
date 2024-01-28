import * as ZK3D from '../src/index';

const round = (x: number, precision: number) => Math.round(x * Math.pow(10, precision)) / Math.pow(10, precision);

describe('Real64 operations', () => {
  const r1 = 0.1234;
  const r2 = 2.3456;
  const r1z = ZK3D.Real64.from(r1);
  const r2z = ZK3D.Real64.from(r2);

  test('real addition', () => {
    const threejsResult = r1 + r2;
    const zk3dResult = r1z.add(r2z);
    expect(round(threejsResult, 4)).toEqual(round(zk3dResult.toNumber(), 4));
  });

  test('real subtraction', () => {
    const threejsResult = r1 - r2;
    const zk3dResult = r1z.sub(r2z);
    expect(round(threejsResult, 4)).toEqual(round(zk3dResult.toNumber(), 4));
  });

  test('real multiplication', () => {
    const threejsResult = r1 * r2;
    const zk3dResult = r1z.mul(r2z);
    expect(round(threejsResult, 4)).toEqual(round(zk3dResult.toNumber(), 4));
  });

  test('real division', () => {
    const threejsResult = r1 / r2;
    const zk3dResult = r1z.div(r2z);
    expect(round(threejsResult, 4)).toEqual(round(zk3dResult.toNumber(), 4));
  });

  test('real inverse', () => {
    const threejsResult = 1 / r1;
    const zk3dResult = r1z.inv();
    expect(round(threejsResult, 4)).toEqual(round(zk3dResult.toNumber(), 4));
  });

  test('real negation', () => {
    const threejsResult = -r1;
    const zk3dResult = r1z.neg();
    expect(round(threejsResult, 4)).toEqual(round(zk3dResult.toNumber(), 4));
  });

  test('real equality', () => {
    const r1z2 = ZK3D.Real64.from(r1);
    expect(r1z.equals(r1z2)).toBeTruthy();
  });

  test('real clone', () => {
    const r1z2 = r1z.clone();
    expect(r1z.equals(r1z2)).toBeTruthy();
  });
});