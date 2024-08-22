import { Service } from "typedi";
import PuzzleEventKeyModel from "@entities/mongo-model/puzzle-event-key.entity";

@Service()
export class PuzzleEventKeyService {
  async addKey(wallet: string): Promise<any> {
    const allPuzzlesProcess = await PuzzleEventKeyModel.findOne({ walletAddress: wallet });
    if (allPuzzlesProcess) return "You have been gotten this key.";
    const newKey = await PuzzleEventKeyModel.create({ walletAddress: wallet });
    return await newKey.save();
  }


}