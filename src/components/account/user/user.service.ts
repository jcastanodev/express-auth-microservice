/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import httpStatus from 'http-status';
import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';
import { UserModel } from '@components/account/user/user.model';
import { IUser } from '@components/account/user/user.interface';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from 'utils/EmailUtils';
import config from '@config/config';
import { JwtUser } from '@interfaces/common/api/jwtUser.interface';
import { MongoIdInterface } from '@interfaces/common/db/MongoId.interface';

interface IUserToken {
  user: IUser;
  token: string;
  expiresIn: string;
}

const expirationTime = parseInt(config.tokenExpirationTime, 10);

const signInWithoutPassword = async (user: IUser): Promise<IUserToken> => {
  try {
    const userExists = await UserModel.findOne({ email: user.email });
    if (!userExists) {
      logger.error(`User no exists: %O`, user.email);
      throw new AppError(httpStatus.BAD_REQUEST, 'User no exists!');
    }
    // create token
    const expirationTimeResponse = new Date(Date.now() + expirationTime);
    const token = jwt.sign(
      {
        user: userExists,
        expiresIn: expirationTimeResponse.toString(),
      } as JwtUser,
      config.secretToken,
    );
    return {
      token,
      expiresIn: expirationTimeResponse.toString(),
      user: userExists,
    };
  } catch (err) {
    logger.error(`Sign In Without Password err: %O`, err.message);
    if (err as AppError) {
      throw err;
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Sign In Without Password err',
      );
    }
  }
};

const signIn = async (user: IUser): Promise<IUserToken> => {
  try {
    const userExists = await UserModel.findOne({ email: user.email });
    if (!userExists) {
      logger.error(`User no exists: %O`, user.email);
      throw new AppError(httpStatus.BAD_REQUEST, 'User no exists!');
    }
    const validPassword = await bcrypt.compare(
      user.password,
      userExists.password,
    );
    if (!validPassword) {
      logger.error(`Bad credentials: %O`, user.email);
      throw new AppError(httpStatus.BAD_REQUEST, 'Bad credentials!');
    }
    return await signInWithoutPassword(userExists);
  } catch (err) {
    logger.error(`User create err: %O`, err.message);
    if (err as AppError) {
      throw err;
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, 'User was not created!');
    }
  }
};

const signUp = async (user: IUser): Promise<IUser> => {
  try {
    const userExists = await UserModel.findOne({ email: user.email });
    if (userExists) {
      logger.error(`User already exists: %O`, user.email);
      throw new AppError(httpStatus.BAD_REQUEST, 'User already exists!');
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);
    const registerUser: IUser = {
      ...user,
      password,
      verified: salt,
    };
    const newUser = await UserModel.create(registerUser);
    logger.debug(`User created: %O`, newUser);
    sendVerificationEmail(newUser);
    return newUser;
  } catch (err) {
    logger.error(`User create err: %O`, err.message);
    if (err as AppError) {
      throw err;
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, 'User was not created!');
    }
  }
};

const create = async (user: IUser): Promise<boolean> => {
  try {
    const newUser = await UserModel.create(user);
    logger.debug(`User created: %O`, newUser);
    return true;
  } catch (err) {
    logger.error(`User create err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'User was not created!');
  }
};

const read = async (id: string | MongoIdInterface): Promise<IUser> => {
  try {
    logger.debug(`Sent user._id ${id}`);
    const user = await UserModel.findOne({ _id: id });
    return user as IUser;
  } catch (err) {
    logger.error(`User ${id} read err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, `User not found ${id}`);
  }
};

const update = async (user: IUser): Promise<IUser> => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: user.email },
      { ...user },
      { new: true },
    );
    logger.debug(`User updated: %O`, updatedUser);
    return updatedUser;
  } catch (err) {
    logger.error(`User update err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'User was not updated!');
  }
};

const verifyEmail = async (emailToken: string): Promise<IUserToken> => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { verified: emailToken },
      { verified: Date.now().toString() },
      { new: true },
    );
    if (!updatedUser) {
      logger.error(`User email token no exists: %O`, emailToken);
      throw new AppError(httpStatus.BAD_REQUEST, 'User no exists!');
    }
    return await signInWithoutPassword(updatedUser);
  } catch (err) {
    logger.error(`User email token err: %O`, err.message);
    if (err as AppError) {
      throw err;
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, 'User email token error!');
    }
  }
};

const deleteById = async (id: string): Promise<boolean> => {
  await UserModel.findByIdAndDelete(id);
  logger.debug(`User ${id} has been removed`);
  return true;
};

export { signIn, signUp, verifyEmail, create, read, update, deleteById };
