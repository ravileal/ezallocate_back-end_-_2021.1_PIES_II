/* eslint-disable class-methods-use-this */
import BaseRepository from '../../repository/mysql/BaseRepository';

export default abstract class BaseUseCase<T> {
  protected repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  abstract execute(payload?: any): Promise<any>;
}
