import Sala from '../../model/Sala';
import BaseUseCase from '../Base/BaseUseCase';

export default class FindByIdSala extends BaseUseCase<Sala> {
  async execute({ id }: { id: string }) {
    console.log(`FindByIdSala ${id}`);
    return this.repository.findById(id);
  }
}
