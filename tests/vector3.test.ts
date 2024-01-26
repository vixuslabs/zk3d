import { Vector3, Real64 } from '../src/index';
import * as THREE from 'three';

describe('Vector3 operations', () => {
  const v1 = [0.001234, 2.345, 0.3456];
  const v2 = [4.567, 0.05678, 6.789];
  
  const v1t = new THREE.Vector3(v1[0], v1[1], v1[2]);
  const v2t = new THREE.Vector3(v2[0], v2[1], v2[2]);
  const v1z = Vector3.fromNumbers(v1[0], v1[1], v1[2]);
  const v2z = Vector3.fromNumbers(v2[0], v2[1], v2[2]);

  test('vector addition', () => {
    expect(v1z.clone().add(v2z).toString()).toEqual(v1t.clone().add(v2t).toString());
  });

});

