import Sala from '../../model/Sala';
import BaseRepository from './BaseRepository';

export default class SalaRepository extends BaseRepository<Sala> {
  constructor() {
    super(Sala);
  }

  findByNome(nome: string) {
    console.log(`dentro do respository ${nome}`);
    return this.repository.find({ nome });
  }
}
