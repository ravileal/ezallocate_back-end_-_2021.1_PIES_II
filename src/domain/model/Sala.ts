import {
  Entity, PrimaryColumn, Generated, Column, OneToMany
} from 'typeorm';
import Base from './Base';
import Horario from './Horario';

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
    this.horario = payload.horario;
  }

  @PrimaryColumn('uuid')
  @Generated('uuid')
  id!: string;

  @Column({ type: 'text', nullable: false, })
  nome!: string;

  @Column({ type: 'text', nullable: false })
  bloco!: string;

  @Column({ type:'boolean', default: false })
  arCondicionado!: boolean;

  @Column({ type:'boolean', default: false })
  projetor!: boolean;

  @Column({ type:'boolean', default: false })
  roteador!: boolean;

  @Column({ type:'boolean', default: false })
  bloqueado: boolean;

  @Column({ type:'int', default: 0 })
  computadores: number;

  @Column({ type:'int', default: 0 })
  capacidade: number;

  @Column({ type:'int', default: 0 })
  tomadaRede: number;

  @Column({ type:'int', default: 0 })
  tomadaEnergia: number;

  @OneToMany(() => Horario, horario => horario.sala)
  horario: Horario[];
}
