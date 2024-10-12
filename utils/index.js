/**
 * 字符串格式化换行
 * @param {String} value
 * @returns
 */
export function lineFeed(value) {
  if (!value) return '';
  return (value + '').trim().replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
}
