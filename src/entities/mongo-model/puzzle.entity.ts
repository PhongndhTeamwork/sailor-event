import { Schema, model, Document } from "mongoose";

const PuzzleSchema= new Schema(
  {
    puzzleId: {
      type: Number
    },
    task: {
      key: String,
      title: String,
      socialType: String
    },
    // quiz: {
    //   type: Schema.Types.ObjectId,
    //   ref: "quiz"
    // },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
);



const PuzzleModel = model<Document>(
  "puzzle",
  PuzzleSchema
);
export { PuzzleModel, PuzzleSchema };
export default PuzzleModel;
