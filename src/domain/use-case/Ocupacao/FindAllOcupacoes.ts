import Ocupacao from '../../model/Ocupacao';
import BaseUseCase from '../Base/BaseUseCase';

export default class FindAllOcupacao extends BaseUseCase<Ocupacao> {
  async execute() {
    return this.repository.findAll();
  }
}
