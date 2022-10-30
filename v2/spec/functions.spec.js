import {describe, expect, test} from '@jest/globals';
import {splitStun} from '../src/functions';

describe('splitStun', () => {
  test('arr', () => {
    const arr = splitStun('stun1,test,pass\nstun2');
    const result = [
      {
        urls: ['stun1'],
        username: 'test',
        credential: 'pass'
      }, { 
        urls: ['stun2']
      }
    ];
    console.log('result eee', result);
    expect(arr).toEqual(result);
  });
});
