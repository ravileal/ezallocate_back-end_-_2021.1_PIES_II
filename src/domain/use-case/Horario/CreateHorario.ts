import Horario from '../../model/Horario';
import BaseUseCase from '../Base/BaseUseCase';

export default class CreateHorario extends BaseUseCase<Horario> {
  async execute(payload: any) {
    const sala = new Horario(payload);
    return this.repository.save(sala);
  }
}
