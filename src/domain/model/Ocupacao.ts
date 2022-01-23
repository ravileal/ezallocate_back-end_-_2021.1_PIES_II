import {
  Entity, PrimaryColumn, Generated, Column, ManyToOne, JoinColumn
} from 'typeorm';
import Base from './Base';
import Sala from './Sala';
@Entity({ name: 'ocupacao' })
export default class Ocupacao implements Base {
  constructor(payload: any) {
    this.id = payload.id;
    this.sala = payload.sala;
    this.sala_id = payload.sala_id;
    this.descricao = payload.descricao;
    this.horario = payload.horario;
    this.dia_semana = payload.dia_semana;
    this.responsavel = payload.responsavel;
    this.prof_responsavel = payload.prof_responsavel;
    this.data_inicio = payload.data_inicio;
    this.data_fim = payload.data_fim;
    this.recusa_motivo = payload.recusa_motivo;
    this.status = payload.status;
  }

  @PrimaryColumn('uuid')
  @Generated('uuid')
  id!: string;

  @ManyToOne(() => Sala)
  @JoinColumn({ name: "sala_id"})
  sala: Sala;

  @Column({ type : 'uuid' })
  sala_id: string;

  @Column({ type: 'text' })
  descricao!: string;

  @Column({ type: 'text' })
  horario!: string;

  @Column({ type: 'text' })
  responsavel!: string;

  @Column({ type: 'text', nullable: true, default: null })
  prof_responsavel: string;

  @Column({ type: 'text' })
  dia_semana!: string;

  @Column({ type: 'date', nullable: true, default: null })
  data_inicio: Date;

  @Column({ type: 'date', nullable: true, default: null })
  data_fim: Date;

  @Column({ type: 'text', nullable: true, default: null })
  recusa_motivo: string;
  // status = { alocado, reservado, pendente, recusado }
  @Column({ type: 'text' })
  status: string;

}
