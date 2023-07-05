import Sala from '../../model/Sala';
import BaseRepository from './BaseRepository';

export default class SalaRepository extends BaseRepository<Sala> {
  constructor() {
    super(Sala);
  }

  findByNome(nome: string) {
    return this.repository.findOne({ nome });
  }

  findByBloco(bloco: string) {
    return this.repository.find({ where: { bloco }, order: { nome: 'ASC' } });
  }
}
