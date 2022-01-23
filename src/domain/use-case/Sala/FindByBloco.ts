import Sala from '../../model/Sala';
import SalaRepository from '../../repository/mysql/SalaRepository';
import BaseUseCase from '../Base/BaseUseCase';

export default class FindByBloco extends BaseUseCase<Sala, SalaRepository> {
  async execute({ name }: { name: string }) {
    return this.repository.findByBloco(name);
  }
}
