import {describe, expect, test} from '@jest/globals';
import {splitStun, getHostFromURI} from '../src/functions';

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


describe('getHostFromURI', () => {
  test('arr', () => {
    const host1 = getHostFromURI('100@1234:80');
    expect(host1).toEqual('1234');
    const host2 = getHostFromURI('sip:100@1234:80');
    expect(host2).toEqual('1234');
  });
});
