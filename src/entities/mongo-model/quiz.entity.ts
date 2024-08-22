import mongoose, { Schema, model, Document } from "mongoose";
import autoIncrement from "mongoose-sequence";

// Initialize the plugin with Mongoose
const autoIncrementPlugin = autoIncrement(mongoose);

const QuizSchema = new Schema(
  {
    quizId: Number,
    topic: String,
    title: String,
    answerId: Number,
    options: [{
      optionId: Number,
      content: String
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
);

QuizSchema.plugin(autoIncrementPlugin, { inc_field: 'quizId' });

const QuizModel = model<Document>(
  "quiz",
  QuizSchema
);
export { QuizModel, QuizSchema };
export default QuizModel;
