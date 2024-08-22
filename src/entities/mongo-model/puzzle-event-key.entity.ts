import { Schema, model, Document } from "mongoose";


const PuzzleEventKeySchema = new Schema(
  {
    ownerAddress: {
      type: String
    },
    userAddress: {
      type: String
    },
    createdAt: { type: Date, default: Date.now },
    usedAt: { type: Date },
    updatedAt: { type: Date, default: Date.now }
  }
);


const PuzzleEventKeyModel = model<Document>(
  "puzzle-event-key",
  PuzzleEventKeySchema
);
export { PuzzleEventKeyModel, PuzzleEventKeySchema };
export default PuzzleEventKeyModel;