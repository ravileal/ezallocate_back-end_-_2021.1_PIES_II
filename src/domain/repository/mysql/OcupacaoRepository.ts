import Ocupacao from '../../model/Ocupacao';
import BaseRepository from './BaseRepository';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
export default class OcupacaoRepository extends BaseRepository<Ocupacao> {
  constructor() {
    super(Ocupacao);
  }

  findByIdSala(id: string) {
    return this.repository.find({ sala_id: id });
  }

  findByIdSalaDateDayOfWeek(id: string, dateDay: string, dayOfWeek: string, time?: string) {
    return this.repository.find({
      sala_id: id,
      horario: time,
      dia_semana: dayOfWeek,
      data_inicio: LessThanOrEqual(dateDay),
      data_fim: MoreThanOrEqual(dateDay)
    });
  }
}
