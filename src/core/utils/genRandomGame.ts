import { ElementWheelEnum } from '@models/enums/config.enum';
// export enum ElementWheelEnum {
//   RAVE_10000,
//   RAVE_50,
//   RAVE_100,
//   GOLD_500,
//   GOLD_200,
//   WHITELIST,
//   ACCESS_KEY,
//   GOOD_LUCK,
//   SPIN,
// }

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
  ...Array(1).fill(ElementWheelEnum.RAVE_10000),
  ...Array(90).fill(ElementWheelEnum.RAVE_50),
  ...Array(200).fill(ElementWheelEnum.GOOD_LUCK),
  ...Array(100).fill(ElementWheelEnum.GOLD_200),
  ...Array(100).fill(ElementWheelEnum.ACCESS_KEY),
  ...Array(319).fill(ElementWheelEnum.GOOD_LUCK),
  ...Array(100).fill(ElementWheelEnum.SPIN),
  ...Array(40).fill(ElementWheelEnum.RAVE_100),
  ...Array(50).fill(ElementWheelEnum.GOLD_500),
];
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomOpenBox(batch: number, ratio: number): number[] {
  const res = [];
  for (let i = 0; i < batch; i++) {
    const numRandom = getRandomInt(0, 999);
    if (ratio > 0.001 && box[numRandom] == ElementWheelEnum.RAVE_10000) {
      res.push(box[getRandomInt(1, 999)]);
      // continue;
    } else {
      res.push(box[numRandom]);
    }
  }

  return res;
}
// async function stat() {
//   let ratio = 0.001;
//   let spin = 0;
//   let reward = 0;
//   let gold = 0;
//   const res = [];
//   for (let i = 0; i < 100000; i++) {
//     ratio = reward / spin;
//     const numRandom = getRandomInt(0, 999);
//     if (ratio > 0.001 && box[numRandom] === ElementWheelEnum.RAVE_10000) {
//       res.push(box[getRandomInt(1, 999)]);
//       gold += 10000;
//     } else {
//       const temp = box[numRandom];
//       if (temp == ElementWheelEnum.RAVE_10000) {
//         reward++;
//         gold += 10000;
//       }
//       if (temp == ElementWheelEnum.RAVE_100) {
//         gold += 100;
//       }
//       if (temp == ElementWheelEnum.RAVE_50) {
//         gold += 50;
//       }

//       res.push(temp);
//     }
//     spin++;
//   }

//   console.log(res);

//   const elementCounts = {};

//   res.forEach((element) => {
//     elementCounts[element] = (elementCounts[element] || 0) + 1;
//   });
//   console.log(elementCounts, gold);
// }
// stat();
