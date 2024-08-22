import { Service } from "typedi";
import { LoginRequest } from "@models/auth/login.request";
import { ApiError } from "@models/api-error";
import { ResponseCodeEnum } from "@models/enums/response-code.enum";
import { VerifyUtils } from "@core/utils/verify";
import { UserInfo } from "@models/authorzization/user.info";
// import { UserInfoResponse } from '@models/user/user-info.response';
import { StatusCodes } from "http-status-codes";
import { getRepository } from "typeorm";
import { AccountEntity } from "@entities/postgres-entities";
import { NetworkTypeEnum } from "@models/enums/netwok.enum";
// import {
//   BurnerBody,
//   BurnerBodyV2,
//   ProfileUpdateBody,
//   UserTutorialRequest,
// } from '@models/user/bind-wallet';
import { formatStarknetWallet } from "@core/utils/convertString";
// import { plainToClass } from 'class-transformer';
import { verifySignatureStarknet } from "@core/utils/verifySignature";
// import AccountEventModel from '@entities/mongo-model/accountEvent.entity';
import { generateReferralCode } from "@core/utils/genRandom";
// import { stark, ec, CallData, hash, RpcProvider, Account } from 'starknet';
// import { accountAbi } from './account.abi';
// import ConfigEventModel from '@entities/mongo-model/configEvent.entity';

@Service()
export class UserService {
  // async checkEventProfile(walletAddress: string) {
  //   try {
  //     const checkData = await AccountEventModel.findOne({
  //       address: walletAddress,
  //     });
  //
  //     if (!checkData) {
  //       const dataCreate = await AccountEventModel.create({
  //         address: walletAddress,
  //         eggPoint: {
  //           total: 0,
  //           used: 0,
  //           holding: 0,
  //         },
  //         dailyData: [],
  //       });
  //       return dataCreate;
  //     }
  //
  //     return checkData;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  async login(
    model: LoginRequest,
    ipAddress: string,
    user: UserInfo
  ): Promise<{ user: UserInfo; token: unknown }> {
    try {
      const checkSign = await verifySignatureStarknet({
        walletAddress: model.address,
        signature: model.signature,
        signData: model.signData
      });

      if (checkSign == false) {
        throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0009);
      }
      // await this.checkEventProfile(formatStarknetWallet(model.address));
      if (!user) {
        const checkWallet = await getRepository(AccountEntity)
          .createQueryBuilder("ui")
          .select(
            `
                ui.id,
                ui.user_name,
                ui.avatar,
                ui.root_address
            `
          )
          .where("ui.root_address = :address", {
            address: formatStarknetWallet(model.address)
          })
          .getRawOne();

        if (!checkWallet) {
          const newUser = await getRepository(AccountEntity).save({
            userName: `SailorBeta_${Date.now()}`,
            avatar: `https://source.boringavatars.com/pixel/120/${model.address}`,
            ipAddress: ipAddress,
            rootAddress: formatStarknetWallet(model.address),
            inviteCode: generateReferralCode(),
            email: '',
          });

          const payloads = {
            id: newUser.id,
            userName: newUser.userName,
            walletAddress: newUser.rootAddress,
            network: model.network || NetworkTypeEnum.VENOM
          };

          const token = await VerifyUtils.createToken(
            {
              payloads
            },
            {}
          );

          return {
            user: payloads,
            token
          };
        }

        const payloads = {
          id: checkWallet.id,
          userName: checkWallet.user_name,
          walletAddress: checkWallet.root_address,
          network: model.network || NetworkTypeEnum.VENOM
        };

        const token = await VerifyUtils.createToken(
          {
            payloads
          },
          {}
        );

        return {
          user: payloads,
          token
        };
      } else {
        const payloads: UserInfo = {
          id: user.id,
          userName: user.userName,
          walletAddress: user.walletAddress,
          network: user.network
        };

        const token = await VerifyUtils.createToken(
          {
            payloads
          },
          {}
        );

        return {
          user: payloads,
          token
        };
      }
    } catch (error) {
      console.log(error);

      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        error._errorCode || ResponseCodeEnum.CM0017
      );
    }
  }

  // async generateBurner() {
  //   const privateKey = stark.randomAddress();
  //   const publicKey = ec.starkCurve.getStarkKey(privateKey);
  //
  //   const calldataAX = new CallData(accountAbi);
  //   const ConstructorAXCallData = calldataAX.compile('constructor', {
  //     public_key: publicKey,
  //   });
  //
  //   const accountAddress = hash.calculateContractAddressFromHash(
  //     publicKey,
  //     '0x05400e90f7e0ae78bd02c77cd75527280470e2fe19c54970dd79dc37a9d3645c',
  //     ConstructorAXCallData,
  //     0,
  //   );
  //
  //   const burnerGen = {
  //     address: accountAddress,
  //     privateKey: privateKey,
  //     publicKey: publicKey,
  //   };
  //
  //   return burnerGen;
  // }
  //
  // async createBurner(model: BurnerBody, user: UserInfo): Promise<any> {
  //   try {
  //     if (!user) {
  //       throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0008);
  //     }
  //     const checkBurner = await getRepository(WalletEntity)
  //       .createQueryBuilder('w')
  //       .select('*')
  //       .where('w.user_id = :userId AND w.network = :networkType', {
  //         networkType: model.network,
  //         userId: user.id,
  //       })
  //       .getRawOne();
  //
  //     if (checkBurner) {
  //       return {
  //         rootAddress: user.walletAddress,
  //         address: checkBurner.address,
  //         privateKey: checkBurner.private_key,
  //         publicKey: checkBurner.public_key,
  //         network: checkBurner.network,
  //         deployTx: checkBurner.deploy_tx,
  //       };
  //     }
  //
  //     const burnerGen = await this.generateBurner();
  //
  //     const createData = await getRepository(WalletEntity).save({
  //       userId: user.id,
  //       address: burnerGen.address,
  //       privateKey: burnerGen.privateKey,
  //       publicKey: burnerGen.publicKey,
  //       network: model.network,
  //       balance: '0',
  //       status: 0,
  //       deployTx: null,
  //     });
  //
  //     return {
  //       rootAddress: user.walletAddress,
  //       address: createData.address,
  //       privateKey: createData.privateKey,
  //       publicKey: createData.publicKey,
  //       network: createData.network,
  //       deployTx: createData.deployTx,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApiError(
  //       StatusCodes.BAD_REQUEST,
  //       error._errorCode || ResponseCodeEnum.CM0017,
  //     );
  //   }
  // }
  //
  // async createBurnerV2(model: BurnerBodyV2, user: UserInfo): Promise<any> {
  //   try {
  //     if (!user) {
  //       throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0008);
  //     }
  //     const now = Date.now();
  //     const checkEvent = await ConfigEventModel.findOne({
  //       key: 'GameEvent',
  //     });
  //     const configData = checkEvent['dataConfig'];
  //     const currentEvent = getCurrentEvent(now, configData);
  //
  //     const checkBurner = await getRepository(WalletEntity)
  //       .createQueryBuilder('w')
  //       .select('*')
  //       .where(
  //         'w.user_id = :userId AND w.event = :event AND w.network = :networkType',
  //         {
  //           networkType: model.network,
  //           userId: user.id,
  //           event: currentEvent,
  //         },
  //       )
  //       .getRawOne();
  //
  //     if (checkBurner) {
  //       throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0061);
  //     }
  //
  //     await getRepository(WalletEntity).save({
  //       userId: user.id,
  //       address: model.address,
  //       formatAddress: formatStarknetWallet(model.address),
  //       privateKey: model.privateKey,
  //       publicKey: model.publicKey,
  //       status: 0,
  //       network: model.network,
  //       deployTx: model.deployTx,
  //       mapId: model.mapId,
  //       event: currentEvent,
  //     });
  //
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApiError(
  //       StatusCodes.BAD_REQUEST,
  //       error._errorCode || ResponseCodeEnum.CM0017,
  //     );
  //   }
  // }
  //
  // async deployBurner(model: BurnerBody, user: UserInfo): Promise<any> {
  //   try {
  //     if (!user) {
  //       throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0008);
  //     }
  //     const checkBurner = await getRepository(WalletEntity)
  //       .createQueryBuilder('w')
  //       .select('*')
  //       .where('w.user_id = :userId AND w.network = :networkType', {
  //         networkType: model.network,
  //         userId: user.id,
  //       })
  //       .getRawOne();
  //
  //     if (checkBurner) {
  //       const providerStarknet = new RpcProvider({
  //         nodeUrl: 'https://api.cartridge.gg/rpc/starknet-sepolia',
  //       });
  //       const burner = new Account(
  //         providerStarknet,
  //         checkBurner.address,
  //         checkBurner.private_key,
  //       );
  //       const deployAccountPayload = {
  //         classHash:
  //           '0x05400e90f7e0ae78bd02c77cd75527280470e2fe19c54970dd79dc37a9d3645c',
  //         constructorCalldata: [checkBurner.public_key],
  //         contractAddress: checkBurner.address,
  //         addressSalt: checkBurner.public_key,
  //       };
  //       const { transaction_hash } = await burner.deployAccount(
  //         deployAccountPayload,
  //       );
  //       await getRepository(WalletEntity)
  //         .createQueryBuilder()
  //         .update()
  //         .set({
  //           deployTx: transaction_hash,
  //         })
  //         .where({
  //           userId: user.id,
  //           network: NetworkTypeEnum.STARKNET,
  //         })
  //         .execute();
  //       return {
  //         rootAddress: user.walletAddress,
  //         address: checkBurner.address,
  //         privateKey: checkBurner.private_key,
  //         publicKey: checkBurner.public_key,
  //         network: checkBurner.network,
  //         deployTx: transaction_hash,
  //       };
  //     } else {
  //       throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0060);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApiError(
  //       StatusCodes.BAD_REQUEST,
  //       error._errorCode || ResponseCodeEnum.CM0017,
  //     );
  //   }
  // }
  //
  // async getProfile(user: UserInfo): Promise<any> {
  //   try {
  //     if (!user) {
  //       throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0008);
  //     }
  //
  //     const dataUser = await getRepository(AccountEntity)
  //       .createQueryBuilder('acc')
  //       .select('*')
  //       .where('acc.root_address = :addressUser', {
  //         addressUser: user.walletAddress,
  //       })
  //       .getRawOne();
  //
  //     if (!dataUser) {
  //       throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0008);
  //     }
  //     const now = Date.now();
  //     const checkEvent = await ConfigEventModel.findOne({
  //       key: 'GameEvent',
  //     });
  //     const configData = checkEvent['dataConfig'];
  //     const currentEvent = getCurrentEvent(now, configData);
  //     const burnerAccount = await getRepository(WalletEntity)
  //       .createQueryBuilder('w')
  //       .select(
  //         `
  //         w.address,
  //         w.private_key,
  //         w.public_key,
  //         w.deploy_tx,
  //         w.map_id,
  //         w.event
  //       `,
  //       )
  //       .where('w.user_id = :userId AND event = :currentEvent', {
  //         userId: user.id,
  //         currentEvent: currentEvent,
  //       })
  //       .getRawOne();
  //
  //     return {
  //       profile: plainToClass(UserInfoResponse, dataUser),
  //       burnerAccount,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApiError(
  //       StatusCodes.BAD_REQUEST,
  //       error._errorCode || ResponseCodeEnum.CM0017,
  //     );
  //   }
  // }
  //
  // async getProfileEvent(user: UserInfo): Promise<any> {
  //   try {
  //     if (!user) {
  //       throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0008);
  //     }
  //
  //     const dataUser = await getRepository(AccountEntity)
  //       .createQueryBuilder('acc')
  //       .select('*')
  //       .where('acc.root_address = :addressUser', {
  //         addressUser: user.walletAddress,
  //       })
  //       .getRawOne();
  //
  //     if (!dataUser) {
  //       throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0008);
  //     }
  //
  //     let eventData = await AccountEventModel.findOne({
  //       address: user.walletAddress,
  //     });
  //
  //     if (!eventData) {
  //       eventData = await AccountEventModel.create({
  //         address: user.walletAddress,
  //         eggPoint: {
  //           total: 0,
  //           used: 0,
  //           holding: 0,
  //         },
  //         dailyData: [],
  //       });
  //     }
  //     eventData = eventData.toJSON();
  //     delete eventData._id;
  //     delete eventData.__v;
  //     return {
  //       profile: plainToClass(UserInfoResponse, dataUser),
  //       eventData,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApiError(
  //       StatusCodes.BAD_REQUEST,
  //       error._errorCode || ResponseCodeEnum.CM0017,
  //     );
  //   }
  // }
  //
  // async getProcessEvent(user: UserInfo): Promise<any> {
  //   try {
  //     if (!user) {
  //       throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0008);
  //     }
  //
  //     let eventData = await AccountEventModel.findOne({
  //       address: user.walletAddress,
  //     });
  //     eventData = eventData.toJSON();
  //     delete eventData._id;
  //     delete eventData.__v;
  //     return eventData;
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApiError(
  //       StatusCodes.BAD_REQUEST,
  //       error._errorCode || ResponseCodeEnum.CM0017,
  //     );
  //   }
  // }
  //
  // async updateProfile(
  //   dataBody: ProfileUpdateBody,
  //   user: UserInfo,
  // ): Promise<any> {
  //   try {
  //     if (!user) {
  //       throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0008);
  //     }
  //
  //     const dataUser = await getRepository(AccountEntity)
  //       .createQueryBuilder('acc')
  //       .select('*')
  //       .where('acc.root_address = :addressUser', {
  //         addressUser: user.walletAddress,
  //       })
  //       .getRawOne();
  //
  //     if (!dataUser) {
  //       throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0008);
  //     }
  //
  //     await getRepository(AccountEntity)
  //       .createQueryBuilder()
  //       .update()
  //       .set({
  //         ...dataBody,
  //       })
  //       .where({
  //         id: user.id,
  //       })
  //       .execute();
  //
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApiError(
  //       StatusCodes.BAD_REQUEST,
  //       error._errorCode || ResponseCodeEnum.CM0017,
  //     );
  //   }
  // }
  //
  // async checkTutorial(dataQuery: UserTutorialRequest): Promise<any> {
  //   try {
  //     if (!dataQuery.walletAddress) {
  //       return false;
  //     }
  //
  //     const check = await getRepository(WalletEntity).findOne({
  //       address: dataQuery.walletAddress,
  //     });
  //
  //     if (!check) {
  //       return false;
  //     }
  //
  //     if ((check as any).type == 0) {
  //       await getRepository(WalletEntity)
  //         .createQueryBuilder()
  //         .update()
  //         .set({
  //           type: 1,
  //         })
  //         .where({
  //           id: (check as any).id,
  //         })
  //         .execute();
  //
  //       return false;
  //     }
  //
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApiError(
  //       StatusCodes.BAD_REQUEST,
  //       error._errorCode || ResponseCodeEnum.CM0017,
  //     );
  //   }
  // }
}
