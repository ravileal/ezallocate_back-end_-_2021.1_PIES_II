import {
  Entity, PrimaryColumn, Generated, Column,
} from 'typeorm';
import Base from './Base';

// The property "name" sets the table name. This is usually implied from the
// class name, however this can be overridden if needed.
@Entity({ name: 'sala' })
export default class Sala implements Base {
  constructor(payload: any) {
    this.id = payload.id;
    this.nome = payload.nome;
    this.bloco = payload.bloco;
    this.arCondicionado = payload.arCondicionado;
    this.projetor = payload.projetor;
    this.roteador = payload.roteador;
    this.bloqueado = payload.bloqueado;
    this.computadores = payload.computadores;
    this.capacidade = payload.capacidade;
    this.tomadaRede = payload.tomadaRede;
    this.tomadaEnergia = payload.tomadaEnergia;
  }

  @PrimaryColumn('text')
  @Generated('uuid')
  id!: string;

  @Column({ type: 'text' })
  nome!: string;

  @Column({ type: 'text' })
  bloco!: string;

  @Column('boolean')
  arCondicionado!: boolean;

  @Column('boolean')
  projetor!: boolean;

  @Column('boolean')
  roteador!: boolean;

  @Column('boolean')
  bloqueado!: boolean;

  @Column('int')
  computadores!: number;

  @Column('int')
  capacidade!: number;

  @Column('int')
  tomadaRede!: number;

  @Column('int')
  tomadaEnergia!: number;
}
