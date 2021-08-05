import Horario from '../../model/Horario';
import BaseRepository from './BaseRepository';

export default class HorarioRepository extends BaseRepository<Horario> {
  constructor() {
    super(Horario);
  }

  // findByNome(nome: string) {
  //   console.log(`dentro do respository ${nome}`);
  //   return this.repository.find({ nome });
  // }
}
