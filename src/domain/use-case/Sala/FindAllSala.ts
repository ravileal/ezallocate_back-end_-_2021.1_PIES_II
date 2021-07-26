import Sala from '../../model/Sala';
import BaseUseCase from '../Base/BaseUseCase';

export default class FindAllSala extends BaseUseCase<Sala> {
  async execute() {
    return this.repository.findAll();
  }
}
