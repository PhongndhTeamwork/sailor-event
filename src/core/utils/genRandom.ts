export function genCode(address: string): string {
  let result = '';
  const characters: string = address;
  const charactersLength: number = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const box = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3,
  3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 9,
];
const poolGold = [0, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000];
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomGoldReward(): number {
  const numRandom = getRandomInt(0, 51);
  return poolGold[box[numRandom]];
}

export function generateOTP(): string {
  const otpLength = 6;
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < otpLength; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
}

export function genEarlyAccessCode(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomKey = 'RaveRaffle_';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomKey += characters.charAt(randomIndex);
  }

  return randomKey;
}

export function generateReferralCode() {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const secondChar = '0123456789';
  let result = 'D';
  const charLength = charset.length;
  result += secondChar.charAt(Math.floor(Math.random() * secondChar.length));
  for (let i = 0; i < 4; ++i) {
    result += charset.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

export const getCurrentEvent = (time: number, configData: any) => {
  let currentEvent = 0;
  // Duyệt qua mảng configData
  for (const config of configData) {
    // Kiểm tra xem now có nằm trong khoảng thời gian của ngày hiện tại hay không
    if (
      time >= Number(config.timeStart) * 1000 &&
      time <= Number(config.timeEnd) * 1000
    ) {
      currentEvent = Number(config.event);
      break; // Dừng vòng lặp khi tìm thấy kết quả
    }
  }

  return currentEvent;
};

export const getWorldConfig = (configData: any) => {
  for (const config of configData) {
    if (config.player !== 100) {
      return config;
    }
  }
  return null;
};
