import AppError from '@shared/errors/AppError';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import authConfig from '@config/authConfig';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.jwt.secret, {
    expiresIn: '1d',
  });
}

export class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = generateToken({ id: user.id });

    return { user, token };
  }
}
