import { Database } from "@core/database";
import * as console from "node:console";
import data from "@database/records/quiz.json";
import QuizModel from "@entities/mongo-model/quiz.entity";


const seedQuiz = async () => {
  await Database.getConnection();
  await QuizModel.deleteMany();
  for (let i = 0; i < data.length; i++) {
    const newQuiz = await QuizModel.create(data[i]);
    await newQuiz.save();
    // console.log(data[i]);
  }

};

seedQuiz().then(() => {
  console.log("Seed quiz");
  process.exit(0);
}).catch(error => {
  console.log(error);
  process.exit(0);
});
