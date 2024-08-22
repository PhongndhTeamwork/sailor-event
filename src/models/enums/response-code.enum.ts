import { logger } from '@core/logger';

export enum ResponseCodeEnum {
  /**
   * Internal server error
   */
  CM0000 = 'CM0000',

  /**
   * Resource not found
   */
  CM0001 = 'CM0001',

  /**
   * Forbidden
   */
  CM0002 = 'CM0002',

  /**
   * Unauthorized
   */
  CM0004 = 'CM0004',

  /**
   * Request parameters error
   */
  CM0005 = 'CM0005',

  /**
   * User already exists
   */
  CM0006 = 'CM0006',

  /**
   * Try add normal user into waiting list
   */
  CM0007 = 'CM0007',

  /**
   * No user found
   */
  CM0008 = 'CM0008',

  /**
   * Wrong signature
   */
  CM0009 = 'CM0009',

  /**
   * Can't edit
   */
  CM0010 = 'CM0010',

  /**
   * You are not the owner
   */
  CM0011 = 'CM0011',

  /**
   * Invalid Address
   */
  CM0012 = 'CM0012',

  /**
   * PoolINO not found
   */
  CM0013 = 'CM0013',

  /**
   * Cacl Whitelist Fail
   */
  CM0014 = 'CM0014',

  /**
   * Social invalid
   */
  CM0015 = 'CM0015',

  /**
   * Wallet address used
   */
  CM0016 = 'CM0016',

  /**
   * Something went wrong
   */
  CM0017 = 'CM0017',

  /**
   * Signature is invalid
   */
  CM0018 = 'CM0018',

  /**
   * OTP code does not exist
   */
  CM0019 = 'CM0019',

  /**
   * OTP has expired
   */
  CM0020 = 'CM0020',

  /**
   * The previous OTP is still valid
   */
  CM0021 = 'CM0021',

  /**
   * You have already connected your wallet at this network
   */
  CM0022 = 'CM0022',

  /**
   * Invalid Token
   */
  CM0023 = 'CM0023',

  /**
   * Already getting points
   */
  CM0024 = 'CM0024',

  /**
   * Invalid code
   */
  CM0025 = 'CM0025',

  /**
   * Your previous key is still valid!
   */
  CM0026 = 'CM0026',

  /**
   * Try again later
   */
  CM0027 = 'CM0027',

  /**
   * Session has not been initialized
   */
  CM0028 = 'CM0028',

  /**
   * Session has been finished
   */
  CM0029 = 'CM0029',

  /**
   * Access code expired
   */
  CM0030 = 'CM0030',

  /**
   * You already connected to Zealy
   */
  CM0031 = 'CM0031',

  /**
   * You must join our community on Zealy
   */
  CM0032 = 'CM0032',

  /**
   * This Twitter account was used. Please use another account
   */
  CM0033 = 'CM0033',

  /**
   * Turn claimed
   */
  CM0034 = 'CM0034',

  /**
   *Out of turn
   */
  CM0035 = 'CM0035',

  /**
   *Invalid point
   */
  CM0036 = 'CM0036',

  /**
   *Out of whitelist
   */
  CM0037 = 'CM0037',

  /**
   *Address already in whitelist
   */
  CM0038 = 'CM0038',

  /**
   * This Email was used. Please use another one
   */
  CM0039 = 'CM0039',

  /**
   * Must mine nft first
   */
  CM0040 = 'CM0040',

  /**
   * Journey Not Found
   */
  CM0041 = 'CM0041',

  /**
   * This task has not started or has ended
   */
  CM0042 = 'CM0042',

  /**
   * Please complete all the tasks first
   */
  CM0043 = 'CM0043',

  /**
   * You have already received this reward
   */
  CM0044 = 'CM0044',

  /**
   * You don't have enough eggs
   */
  CM0045 = 'CM0045',

  /**
   * The winner has been decided
   */
  CM0046 = 'CM0046',

  /**
   * This NFT is already locked
   */
  CM0047 = 'CM0047',

  /**
   * Click PLAY to create your burner before activating your NFT
   */
  CM0048 = 'CM0048',

  /**
   * This NFT is already unlocked
   */
  CM0049 = 'CM0049',

  /**
   * You are already minted
   */
  CM0050 = 'CM0050',

  /**
   * Please upgrade or deploy your account first
   */
  CM0051 = 'CM0051',

  /**
   * Please lock the NFT first
   */
  CM0052 = 'CM0052',

  /**
   * You are not eligible
   */
  CM0053 = 'CM0053',

  /**
   * You must join the game first
   */
  CM0054 = 'CM0054',

  /**
   * The reward period has either ended or has not yet begun.
   */
  CM0055 = 'CM0055',

  /**
   * Referral code does not exist
   */
  CM0056 = 'CM0056',

  /**
   * You can't use your own invitation code
   */
  CM0057 = 'CM0057',

  /**
   * You have already entered an invitation code from someone else
   */
  CM0058 = 'CM0058',

  /**
   * Please invite someone first
   */
  CM0059 = 'CM0059',

  /**
   * Please create burner first
   */
  CM0060 = 'CM0060',

  /**
   * You already have burner
   */
  CM0061 = 'CM0061',
}

const RESPONSE_CODE_MESSAGE_MAP: { [key in ResponseCodeEnum]: string } = {
  [ResponseCodeEnum.CM0000]: 'Internal server error',
  [ResponseCodeEnum.CM0001]: 'Resource not found',
  [ResponseCodeEnum.CM0002]: 'Forbidden',
  [ResponseCodeEnum.CM0004]: 'Unauthorized',
  [ResponseCodeEnum.CM0005]: 'Request parameters error',
  [ResponseCodeEnum.CM0006]: 'User already exists',
  [ResponseCodeEnum.CM0007]: 'Try add normal user into waiting list',
  [ResponseCodeEnum.CM0008]: 'No user found',
  [ResponseCodeEnum.CM0009]: 'Wrong signature',
  [ResponseCodeEnum.CM0010]: `Can't edit`,
  [ResponseCodeEnum.CM0011]: `You are not the owner`,
  [ResponseCodeEnum.CM0012]: `Invalid address`,
  [ResponseCodeEnum.CM0013]: `PoolINO not found`,
  [ResponseCodeEnum.CM0014]: `Cacl Whitelist Fail`,
  [ResponseCodeEnum.CM0015]: `Your social account has been used or is not valid`,
  [ResponseCodeEnum.CM0016]: `Your wallet address has been used`,
  [ResponseCodeEnum.CM0017]: `Something went wrong`,
  [ResponseCodeEnum.CM0018]: `Signature is invalid`,
  [ResponseCodeEnum.CM0019]: `OTP code does not exist`,
  [ResponseCodeEnum.CM0020]: `OTP has expired`,
  [ResponseCodeEnum.CM0021]: `The previous OTP is still valid`,
  [ResponseCodeEnum.CM0022]: `You have already connected your wallet at this network`,
  [ResponseCodeEnum.CM0023]: `Invalid Token`,
  [ResponseCodeEnum.CM0024]: `Already getting points`,
  [ResponseCodeEnum.CM0025]: `Invalid Code`,
  [ResponseCodeEnum.CM0026]: `Your previous key is still valid!`,
  [ResponseCodeEnum.CM0027]: `Try again later`,
  [ResponseCodeEnum.CM0028]: `Session has not been initialized`,
  [ResponseCodeEnum.CM0029]: `Session has been finished`,
  [ResponseCodeEnum.CM0030]: `Access code expired`,
  [ResponseCodeEnum.CM0031]: `You already connected to Zealy`,
  [ResponseCodeEnum.CM0032]: `You must join our community on Zealy`,
  [ResponseCodeEnum.CM0033]: `This Twitter account was used. Please use another account`,
  [ResponseCodeEnum.CM0034]: `Turn claimed`,
  [ResponseCodeEnum.CM0035]: `Out of turn`,
  [ResponseCodeEnum.CM0036]: `Invalid point`,
  [ResponseCodeEnum.CM0037]: `Out of whitelist`,
  [ResponseCodeEnum.CM0038]: `Address already in whitelist`,
  [ResponseCodeEnum.CM0039]: `This Email was used. Please use another one`,
  [ResponseCodeEnum.CM0040]: `Must mine nft first`,
  [ResponseCodeEnum.CM0041]: `Journey Not Found`,
  [ResponseCodeEnum.CM0042]: `This task has not started or has ended`,
  [ResponseCodeEnum.CM0043]: `Please complete all the tasks first`,
  [ResponseCodeEnum.CM0044]: `You have already received this reward`,
  [ResponseCodeEnum.CM0045]: `You don't have enough eggs`,
  [ResponseCodeEnum.CM0046]: `The winner has been decided`,
  [ResponseCodeEnum.CM0047]: `This NFT is already locked`,
  [ResponseCodeEnum.CM0048]: `Click PLAY to create your burner before activating your NFT`,
  [ResponseCodeEnum.CM0049]: `This NFT is already unlocked`,
  [ResponseCodeEnum.CM0050]: `You are already minted`,
  [ResponseCodeEnum.CM0051]: `Please upgrade or deploy your account first`,
  [ResponseCodeEnum.CM0052]: `Please lock the NFT first`,
  [ResponseCodeEnum.CM0053]: `You are not eligible`,
  [ResponseCodeEnum.CM0054]: `You must join the game first`,
  [ResponseCodeEnum.CM0055]: `The reward period has either ended or has not yet begun`,
  [ResponseCodeEnum.CM0056]: `Referral code does not exist`,
  [ResponseCodeEnum.CM0057]: `You can't use your own invitation code`,
  [ResponseCodeEnum.CM0058]: `You have already entered an invitation code from someone else`,
  [ResponseCodeEnum.CM0059]: `Please invite someone first`,
  [ResponseCodeEnum.CM0060]: `Please create burner first`,
  [ResponseCodeEnum.CM0061]: `You already have burner`,
};

export const getMessage = (responseCode: ResponseCodeEnum): string => {
  if (RESPONSE_CODE_MESSAGE_MAP[responseCode]) {
    return RESPONSE_CODE_MESSAGE_MAP[responseCode];
  } else {
    logger.error('Response code not found in dictionary', responseCode);
    return null;
  }
};
