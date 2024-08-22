export function transformString(str: string): string {
  // Biến tất cả các ký tự chữ cái thành viết thường
  let transformedStr = str.toLowerCase();

  // Bỏ dấu
  transformedStr = transformedStr
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Thay đổi khoảng trắng thành dấu '-'
  transformedStr = transformedStr.replace(/\s+/g, '-');

  // Xóa bỏ ký tự đặc biệt
  transformedStr = transformedStr.replace(/[^\w-]/g, '');

  return transformedStr;
}

export const formatStarknetWallet = (address: any) => {
  if (!address) return '';
  return (
    address.split('x')[0] +
    'x' +
    '0'.repeat(66 - address.length) +
    address.split('x')[1]
  ).toLocaleLowerCase();
};

export const formatJourneyId = (address: any) => {
  if (address.length === 66 && address[2] === '0') {
    return '0x' + address.slice(3);
  } else {
    return address;
  }
};

export const str_to_felt = (text: string) => {
  return BigInt('0x' + Buffer.from(text, 'utf8').toString('hex'))
    .toString()
    .replace('n', '');
};
