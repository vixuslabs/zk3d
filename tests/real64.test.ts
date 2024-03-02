import * as ZK3D from '../src/index';

describe('Real64 operations', () => {
  const r1 = 0.1234;
  const r2 = 2.3456;
  const r1z = ZK3D.Real64.from(r1);
  const r2z = ZK3D.Real64.from(r2);

  test('real addition', () => {
    const result = r1 + r2;
    const zk3dResult = r1z.add(r2z).toNumber();
    expect(zk3dResult).toBeCloseTo(result, 4);
  });

  test('real subtraction', () => {
    const result = r1 - r2;
    const zk3dResult = r1z.sub(r2z).toNumber();
    expect(zk3dResult).toBeCloseTo(result, 4);
  });

  test('real multiplication', () => {
    const result = r1 * r2;
    const zk3dResult = r1z.mul(r2z).toNumber();
    expect(zk3dResult).toBeCloseTo(result, 4);
  });

  test('real division', () => {
    const result = r1 / r2;
    const zk3dResult = r1z.div(r2z).toNumber();
    expect(zk3dResult).toBeCloseTo(result, 4);
  });

  test('real inverse', () => {
    const result = 1 / r1;
    const zk3dResult = r1z.inv().toNumber();
    expect(zk3dResult).toBeCloseTo(result, 4);
  });

  test('real negation', () => {
    const result = -r1;
    const zk3dResult = r1z.neg().toNumber();
    expect(zk3dResult).toBeCloseTo(result, 4);
  });

  // Note: The 'real equality' and 'real clone' tests don't require `toBeCloseTo` as they are checking boolean conditions.
  test('real equality', () => {
    const r1z2 = ZK3D.Real64.from(r1);
    expect(r1z.equals(r1z2)).toBeTruthy();
  });

  test('real clone', () => {
    const r1z2 = r1z.clone();
    expect(r1z.equals(r1z2)).toBeTruthy();
  });
});
