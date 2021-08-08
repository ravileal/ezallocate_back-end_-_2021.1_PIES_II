import Sala from '../../model/Sala';
import { SalaRepository } from '../../repository/mysql';
import BaseUseCase from '../Base/BaseUseCase';

export default class DeleteSala extends BaseUseCase<Sala, SalaRepository> {
  async execute({ id }: { id: string }) {
    return this.repository.delete(id);
  }
}
