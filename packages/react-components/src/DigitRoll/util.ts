// 456,6,',' => '000,456'
export const formatDigit = (
  num: string | number,
  length?: number,
  divider = '',
  splitLength = 3
): string[] => {
  let sum: string | string[] = '0'; // in case some random input

  if (typeof num === 'string') {
    sum = num;
  } else if (typeof num === 'number') {
    sum = num.toString();
  }

  // '1234' => '001234'
  const _len = sum.length;
  const _fullLen = length && typeof length === 'number' ? length : _len;

  if (_len >= _fullLen) {
    sum = sum.substring(_len - _fullLen, _len);
  } else {
    for (let i = 0; i < _fullLen - _len; i++) {
      sum = '0' + sum;
    }
  }

  sum = sum.split('').reverse();

  for (let i = sum.length - 1; i > 0; i--) {
    if (i % splitLength === 0) {
      sum.splice(i, 0, divider);
    }
  }

  return sum;
};

const _getArr = (a: number, b: number) => new Array(b - a + 1).fill(0).map((i, index) => a + index);

// '9','2'  =>  [9,0,1,2]
export const getArr = (x: number, y: number) => {
  const a = parseInt(String(x), 10);
  const b = parseInt(String(y), 10);

  if (a === b) {
    return [a];
  } else if (a < b) {
    return _getArr(a, b);
  } else {
    return [..._getArr(a, 9), ..._getArr(0, b)];
  }
};
