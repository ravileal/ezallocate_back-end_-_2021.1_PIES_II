import Ocupacao from '../../model/Ocupacao';
import { OcupacaoRepository } from '../../repository/mysql';
import BaseUseCase from '../Base/BaseUseCase';
import moment from 'moment';

export default class FindByIdSalaDayOcupacao extends BaseUseCase<Ocupacao, OcupacaoRepository> {
  async execute({ id, dateDay, time }: { id: string, dateDay: string, time?: string }) {
    const dayOfWeek = moment(dateDay).format('dddd');
    return this.repository.findByIdSalaDateDayOfWeek(id, dateDay, dayOfWeek, time);
  }
}
