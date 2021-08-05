import Ocupacao from '../../model/Ocupacao';
import BaseRepository from './BaseRepository';

export default class OcupacaoRepository extends BaseRepository<Ocupacao> {
  constructor() {
    super(Ocupacao);
  }

  // findByNome(nome: string) {
  //   console.log(`dentro do respository ${nome}`);
  //   return this.repository.find({ nome });
  // }
}
