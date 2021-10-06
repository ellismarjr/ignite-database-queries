import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    // Complete usando ORM
    const user = await this.repository.findOne(user_id, 
      {
        relations: ['games']
      });
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query("SELECT * FROM users ORDER BY first_name"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const user =  await this.repository.query(`select first_name, last_name, email from users
    where LOWER(first_name) = LOWER('${first_name}') and
    LOWER(last_name) = LOWER('${last_name}')`); // Complete usando raw query
    return user;
  }
}
