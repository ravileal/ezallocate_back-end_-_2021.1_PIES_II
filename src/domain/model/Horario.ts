import {
  Entity, PrimaryColumn, Generated, Column, ManyToOne, OneToMany
} from 'typeorm';
import Base from './Base';
import Sala from './Sala';
import Ocupacao from './Ocupacao';

@Entity({ name: 'horario' })
export default class Horario implements Base {
  constructor(payload: any) {
    this.id = payload.id;
    this.horario = payload.horario;
    this.status = payload.status;
    this.dia_semana = payload.dia_semana;
    this.sala = payload.sala;
    this.ocupacao = payload.ocupacao;
  }

  @PrimaryColumn('uuid')
  @Generated('uuid')
  id!: string;

  @Column({ type: 'text' })
  horario!: string;

  @Column({ type: 'text' })
  status!: string;

  @Column('text')
  dia_semana!: string;

  @ManyToOne(() => Sala, sala => sala.horario)
  sala: Sala;

  @OneToMany(() => Ocupacao, ocupacao => ocupacao.horario)
  ocupacao!: Ocupacao[];

}
