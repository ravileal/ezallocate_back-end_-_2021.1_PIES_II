import Horario from '../../model/Horario';
import BaseUseCase from '../Base/BaseUseCase';

export default class DeleteHorario extends BaseUseCase<Horario> {
  async execute({ id }: { id: string }) {
    return this.repository.delete(id);
  }
}
