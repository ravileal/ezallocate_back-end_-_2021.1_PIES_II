import Sala from '../../model/Sala';
import { SalaRepository } from '../../repository/mysql';
import BaseUseCase from '../Base/BaseUseCase';

export default class CreateSala extends BaseUseCase<Sala, SalaRepository> {
  async execute(payload: any) {
    const sala = new Sala(payload);
    return this.repository.save(sala);
  }
}
