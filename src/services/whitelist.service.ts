import { Service } from "typedi";
import AccountHistoryModel from "@entities/mongo-model/account-history.entity";
import { getRepository } from "typeorm";
import { WhitelistEntity } from "@entities/postgres-entities";

@Service()
export class WhitelistService {
  async addWallet(wallet: string): Promise<string | WhitelistEntity> {
    const allPuzzlesProcess = await AccountHistoryModel.find({ walletAddress: wallet });
    if (allPuzzlesProcess.length !== 9) return "You have not finished event yet";
    const isSatisfy: boolean = allPuzzlesProcess.every((allPuzzlesProcess) => {
      return (allPuzzlesProcess as any).checkQuiz === true && (allPuzzlesProcess as any).checkTask === true;
    });
    if (!isSatisfy) return "You have not finished event yet 1212";

    const whitelist = await getRepository(WhitelistEntity).findOne({ where: { walletAddress: wallet } });
    if (whitelist) return "You have already been in whitelist";

    const newPriorityWallet = getRepository(WhitelistEntity).create(new WhitelistEntity({
      walletAddress: wallet,
      type: "Full Puzzle"
    }));
    return await getRepository(WhitelistEntity).save(newPriorityWallet);
  }
}