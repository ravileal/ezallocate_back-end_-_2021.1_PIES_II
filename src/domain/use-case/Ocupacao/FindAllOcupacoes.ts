import Ocupacao from '../../model/Ocupacao';
import { OcupacaoRepository } from '../../repository/mysql';
import BaseUseCase from '../Base/BaseUseCase';

export default class FindAllOcupacao extends BaseUseCase<Ocupacao, OcupacaoRepository> {
  async execute() {
    return this.repository.findAll();
  }
}
