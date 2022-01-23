import Ocupacao from '../../model/Ocupacao';
import { OcupacaoRepository } from '../../repository/mysql';
import BaseUseCase from '../Base/BaseUseCase';

export default class FindByIdSalaOcupacao extends BaseUseCase<Ocupacao, OcupacaoRepository> {
  async execute({ id }: { id: string }) {
    return this.repository.findByIdSala(id);
  }
}
