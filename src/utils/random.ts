export class RandomNumber {


  private static getRandomNumber(min : number, max : number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static getUniqueRandomNumbers(count: number, min: number, max: number, existNumbers: number[]) : any {
    if (count > (max - min + 1)) {
      throw new Error("Count exceeds the number of available unique values in the range.");
    }
    const array = [];
    for (let i = min; i <= max; i++) {
      array.push(i);
    }

    const remainArray = array.filter(element => !existNumbers.includes(element));
    if (remainArray.length <= count) {
      return remainArray;
    }

    const numbers = new Set();
    while (numbers.size < count) {
      const index = this.getRandomNumber(0, remainArray.length - 1);
      numbers.add(remainArray[index]);
    }

    return Array.from(numbers);
  }

// const uniqueRandomNumbers = getUniqueRandomNumbers(3, 3, 9);
// console.log(uniqueRandomNumbers);
}