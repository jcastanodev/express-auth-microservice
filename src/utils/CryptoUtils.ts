import crypto from 'crypto';

export const generateRandomSalt = (): string => {
  const length = 12;
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let salt = '';
  for (let i: number = 0; i < length; i += 1) {
    salt += characters[Math.floor(Math.random() * characters.length)];
  }
  return salt;
};

export const hashString = (str: string): string => {
  return crypto.createHash('sha256').update(str).digest('hex');
};

interface CryptoWithSaltResult {
  salt: string;
  hashed: string;
}

export const hashStringWithSalt = (str: string): CryptoWithSaltResult => {
  const salt = generateRandomSalt();
  const hashed = crypto
    .createHash('sha256')
    .update(str + salt)
    .digest('hex');
  return { salt, hashed } as CryptoWithSaltResult;
};

export const equalStringHash = (str: string, comparedHash: string): boolean => {
  const hashed = crypto.createHash('sha256').update(str).digest('hex');
  return comparedHash === hashed;
};

export const equalStringHashWithSalt = (
  str: string,
  salt: string,
  comparedHash: string,
): boolean => {
  const hashed = crypto
    .createHash('sha256')
    .update(str + salt)
    .digest('hex');
  return comparedHash === hashed;
};
