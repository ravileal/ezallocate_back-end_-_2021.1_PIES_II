import {
  Entity, PrimaryColumn, Generated, Column, ManyToOne,
} from 'typeorm';
import Base from './Base';
import Horario from './Horario';

@Entity({ name: 'ocupacao' })
export default class Ocupacao implements Base {
  constructor(payload: any) {
    this.id = payload.id;
    this.descricao = payload.descricao;
    this.frequencia = payload.frequencia;
    this.data_fim = payload.data_fim;
    this.responsavel = payload.responsavel;
    this.prof_responsavel = payload.prof_responsavel;
    this.status = payload.status;
    this.recusa_motivo = payload.recusa_motivo;
    this.tipo = payload.tipo;
    this.horario = payload.horario;
  }

  @PrimaryColumn('uuid')
  @Generated('uuid')
  id!: string;

  @Column({ type: 'text' })
  descricao!: string;

  @Column({ type: 'text' })
  frequencia!: string;

  @Column({ type: 'date', nullable: true, default: null })
  data_fim: Date;

  @Column({ type: 'text' })
  responsavel!: string;

  @Column({ type: 'text', nullable: true, default: null })
  prof_responsavel: string;

  @Column({ type: 'text' })
  status!: string;

  @Column({ type: 'text', nullable: true, default: null })
  recusa_motivo: string;

  @Column({ type: 'text' })
  tipo: string;

  @ManyToOne(() => Horario, horario => horario.ocupacao)
  horario!: Horario;

}
