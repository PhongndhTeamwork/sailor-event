import { Database } from "@core/database";
import * as console from "node:console";
import data from "@database/records/puzzle.json";
import PuzzleModel from "@entities/mongo-model/puzzle.entity";


const seedPuzzle = async () => {
  await Database.getConnection();
  await PuzzleModel.deleteMany();
  for (let i = 0; i < data.length; i++) {
    const newPuzzle = await PuzzleModel.create(data[i]);
    await newPuzzle.save();
    // console.log(data[i]);
  }

};

seedPuzzle().then(() => {
  console.log("Seed puzzle");
  process.exit(0);
}).catch(error => {
  console.log(error);
  process.exit(0);
});
