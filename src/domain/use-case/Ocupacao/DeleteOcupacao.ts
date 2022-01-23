import Ocupacao from '../../model/Ocupacao';
import { OcupacaoRepository } from '../../repository/mysql';
import BaseUseCase from '../Base/BaseUseCase';

export default class DeleteOcupacao extends BaseUseCase<Ocupacao, OcupacaoRepository> {
  async execute({ id }: { id: string }) {
    return this.repository.delete(id);
  }
}
