export const formatImage = (imgSrc: string) => {
  if (imgSrc?.includes('ipfs:')) {
    imgSrc = imgSrc.replace(/ipfs:\//, 'https://ipfs.io/ipfs/');
  }

  return imgSrc;
};


export function returnTime(time: number) {
  if (isNaN(time) === true) return 'Error!' + '"' + time + '"' + ' is NaN';
  if (time < 0) return 'Error! 过去的时间大于现在的时间!';
  else {
    let diffValue = (Date.now() - time) / 1000 / 60;
    if (diffValue < 1) return '刚刚';
    // @ts-ignore
    if (diffValue < 60) return parseInt(diffValue) + '分钟前';
    // @ts-ignore
    if (diffValue < 60 * 24) return parseInt(diffValue / 60) + '小时前';
    // @ts-ignore
    if (diffValue < 60 * 24 * 30) return parseInt(diffValue / 60 / 24) + '天前';
    // @ts-ignore
    return parseInt(diffValue / 60 / 24 / 30) + '月前';
  }
}

export function currencyFormat(value:string, currency?:string, decimals?:number) {
  const digitsRE = /(\d{3})(?=\d)/g
  let _value = parseFloat(value)
  if (!isFinite(_value) || (!_value && _value !== 0)) return ""
  currency = currency != null ? currency : ""
  decimals = decimals != null ? decimals : 0
  let stringified = Math.abs(_value).toFixed(decimals)
  let _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  let i = _int.length % 3
  let head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : ""
  let _float = decimals ? stringified.slice(-1 - decimals) : ""
  let sign = _value < 0 ? "-" : ""
  return `${sign}${currency} ${head}${_int
    .slice(i)
    .replace(digitsRE, "$1,")}${_float}`
}
