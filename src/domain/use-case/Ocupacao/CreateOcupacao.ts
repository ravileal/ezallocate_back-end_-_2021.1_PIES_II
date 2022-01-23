import Ocupacao from '../../model/Ocupacao';
import { OcupacaoRepository } from '../../repository/mysql';
import BaseUseCase from '../Base/BaseUseCase';

export default class CreateOcupacao extends BaseUseCase<Ocupacao, OcupacaoRepository> {
  async execute(payload: any) {
    const sala = new Ocupacao(payload);
    return this.repository.save(sala);
  }
}
