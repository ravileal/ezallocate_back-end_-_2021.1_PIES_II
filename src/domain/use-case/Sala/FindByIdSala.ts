import Sala from '../../model/Sala';
import BaseUseCase from '../Base/BaseUseCase';

export default class FindByIdSala extends BaseUseCase<Sala> {
  async execute({ id }: { id: string }) {
    return this.repository.findById(id);
  }
}
