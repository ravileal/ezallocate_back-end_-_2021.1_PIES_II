import Sala from '../../model/Sala';
import SalaRepository from '../../repository/mysql/SalaRepository';
import BaseUseCase from '../Base/BaseUseCase';

export default class FindByIdSala extends BaseUseCase<Sala> {
  async execute({ nome }: { nome: string }) {
    return (this.repository as SalaRepository).findByNome(nome);
  }
}
