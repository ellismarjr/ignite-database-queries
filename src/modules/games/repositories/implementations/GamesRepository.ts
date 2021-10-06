import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private repositoryUser: Repository<User>;

  constructor() {
    this.repository = getRepository(Game);
    this.repositoryUser = getRepository(User);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("games")
      .select(["games.title"])
      .where(`LOWER(games.title) LIKE LOWER('%${param}%')`)
      .getMany();
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(id) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const user =  this.repositoryUser
      .createQueryBuilder("users")
      .select(["users.first_name", "users.last_name", "users.email"])
      .innerJoin("users_games_games", "ug", "ug.usersId = users.id")
      .where(`ug.gamesId = '${id}'`)
      .getMany();
      // Complete usando query builder
      return user;
  }
}
