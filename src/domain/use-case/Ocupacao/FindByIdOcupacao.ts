import Ocupacao from '../../model/Ocupacao';
import BaseUseCase from '../Base/BaseUseCase';

export default class FindByIdOcupacao extends BaseUseCase<Ocupacao> {
  async execute({ id }: { id: string }) {
    return this.repository.findById(id);
  }
}
