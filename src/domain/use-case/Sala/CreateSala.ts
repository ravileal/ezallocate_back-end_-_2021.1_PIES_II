import Sala from '../../model/Sala';
import BaseUseCase from '../Base/BaseUseCase';

export default class CreateSala extends BaseUseCase<Sala> {
  async execute(payload: any) {
    const sala = new Sala(payload);
    return this.repository.save(sala);
  }
}
