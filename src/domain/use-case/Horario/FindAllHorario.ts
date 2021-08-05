import Horario from '../../model/Horario';
import BaseUseCase from '../Base/BaseUseCase';

export default class FindAllHorario extends BaseUseCase<Horario> {
  async execute() {
    return this.repository.findAll();
  }
}
