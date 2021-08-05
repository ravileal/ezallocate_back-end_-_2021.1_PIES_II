import Ocupacao from '../../model/Ocupacao';
import BaseUseCase from '../Base/BaseUseCase';

export default class UpdateOcupacao extends BaseUseCase<Ocupacao> {
  async execute(payload: any) {
    const sala = new Ocupacao(payload);
    return this.repository.save(sala);
  }
}
