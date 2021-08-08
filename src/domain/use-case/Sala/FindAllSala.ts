import Sala from '../../model/Sala';
import { SalaRepository } from '../../repository/mysql';
import BaseUseCase from '../Base/BaseUseCase';

export default class FindAllSala extends BaseUseCase<Sala, SalaRepository> {
  async execute() {
    return this.repository.findAll();
  }
}
