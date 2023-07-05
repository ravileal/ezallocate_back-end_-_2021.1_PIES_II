import {
  EntityTarget, Repository,
} from 'typeorm';
import BDConnection from './BDConnection';
import Base from '../../model/Base';

export default class BaseRepository<T extends Base> {
  protected repository: Repository<T>;

  constructor(target: EntityTarget<T>) {
    this.repository = BDConnection.getConnection().getRepository(target);
  }

  async save<Type>(entity: any) {
    return this.repository.save(entity);
  }

  findAll() : Promise<T[]> {
    return this.repository.find();
  }

  findById(id: any) {
    return this.repository.findOne(id);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
