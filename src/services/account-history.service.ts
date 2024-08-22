import { Service } from "typedi";
import AccountHistoryModel from "@entities/mongo-model/account-history.entity";
import { UserAction } from "@models/enums/user-action";

@Service()
export class AccountHistoryService {
  async createAccountHistory(walletAddress: string): Promise<any> {
    const existAccountHistory = await AccountHistoryModel.findOne({ walletAddress });
    if (existAccountHistory) {
      return "This wallet has been connected.";
    }
    const accountHistory = await AccountHistoryModel.create({ walletAddress });
    return await accountHistory.save();
  }

  async getActivatedPuzzle(walletAddress: string): Promise<any> {
    const existAccountHistories = await AccountHistoryModel.find({ walletAddress, typeAction: UserAction.PLAY_PUZZLE });
    return existAccountHistories.map((h) => (h as any).puzzleId);
  }
}