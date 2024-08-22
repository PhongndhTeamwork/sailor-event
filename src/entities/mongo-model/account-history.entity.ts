import { Document, model, Schema } from "mongoose";

const AccountHistorySchema = new Schema(
  {
    walletAddress: {
      type: String,
    },
    typeAction: String, status: Number,
    checkTask: { type: Boolean, default: false },
    checkQuiz: { type: Boolean, default: false },
    puzzleId: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
const AccountHistoryModel = model<Document>(
  "account-history",
  AccountHistorySchema
);
export { AccountHistoryModel, AccountHistorySchema };
export default AccountHistoryModel;
