import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { config } from '@config/app';
import crypto from 'crypto';
export class VerifyUtils {
  public static createToken(payload, options: SignOptions) {
    const signOptions = Object.assign(
      {
        algorithm: 'HS256',
      },
      options,
    );
    return new Promise((resolve, reject) => {
      jwt.sign(payload, config.jwt_secret, signOptions, (err, encoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(encoded);
        }
      });
    });
  }

  public static verifyToken(token: string, ignoreExpiration?: boolean): any {
    if (ignoreExpiration) {
      const res = jwt.verify(
        token,
        config.jwt_secret,
        {
          ignoreExpiration: ignoreExpiration,
        },
        (err: any, decoded: unknown) => {
          if (err) {
            return null;
          } else {
            return decoded;
          }
        },
      );

      return res;
    } else {
      const res = jwt.verify(
        token,
        config.jwt_secret,
        (err: any, decoded: unknown) => {
          if (err) {
            return null;
          } else {
            return decoded;
          }
        },
      );

      return res;
    }
  }

  public static signSHA2(data: string, secret: string): string {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(data);
    return hmac.digest('hex');
  }

  // public static checkAddressFormat(address: string): boolean {
  //   if (!address || !ObjectId(address)) return false;
  //   address = address.toString();
  //   return address.length === 42 && address.startsWith('0x');
  // }

  public static verifySignature(
    data: string,
    signature: string,
    secret: string,
  ): boolean {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(data);
    const computedSignature = hmac.digest('hex');
    // console.log(computedSignature);

    return signature === computedSignature;
  }
}
