import Sala from '../../model/Sala';
import BaseRepository from './BaseRepository';

export default class SalaRepository extends BaseRepository<Sala> {
  constructor() {
    super(Sala);
  }

  findByNome(nome: string) {
    return this.repository.find({ nome });
  }

  findByBloco(bloco: string) {
    return this.repository.find({ bloco });
  }
}
