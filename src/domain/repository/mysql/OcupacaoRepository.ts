import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import Ocupacao from '../../model/Ocupacao';
import BaseRepository from './BaseRepository';

export default class OcupacaoRepository extends BaseRepository<Ocupacao> {
  constructor() {
    super(Ocupacao);
  }

  findByIdSala(id: any) {
    return this.repository.findOne({ sala_id: id });
  }

  findByIdSalaDateDayOfWeek(id: string, dateDay: string, dayOfWeek: string, time?: string) {
    return this.repository.findOne({
      sala_id: id,
      horario: time,
      dia_semana: dayOfWeek,
      data_inicio: LessThanOrEqual(dateDay),
      data_fim: MoreThanOrEqual(dateDay),
    });
  }
}
