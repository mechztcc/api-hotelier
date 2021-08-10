import { getCustomRepository } from 'typeorm';
import { hash } from 'bcrypt';

import UserRepository from '../typeorm/repositories/UsersRepository';
import { AppError } from '../../../shared/errors/AppError';
import User from '../typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email address already used');
    }

    const hashedPass = await hash(password, 8);
    const user = usersRepository.create({ name, email, password: hashedPass });

    await usersRepository.save(user);
    return user;
  }
}
