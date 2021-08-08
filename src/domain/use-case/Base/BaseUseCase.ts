/* eslint-disable class-methods-use-this */
import BaseRepository from '../../repository/mysql/BaseRepository';
import Base from '../../model/Base';

export default abstract class BaseUseCase<Model extends Base, Repository extends BaseRepository<Model> > {
  protected repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  abstract execute(payload?: any): Promise<any>;

}
