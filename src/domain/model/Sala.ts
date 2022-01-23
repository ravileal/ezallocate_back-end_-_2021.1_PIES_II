import {
  Entity, PrimaryColumn, Generated, Column
} from 'typeorm';
import Base from './Base';

@Entity({ name: 'sala' })
export default class Sala implements Base {
  constructor(payload: any) {
    this.id = payload.id;
    this.nome = payload.nome;
    this.bloco = payload.bloco;
    this.ar_condicionado = payload.ar_condicionado;
    this.projetor = payload.projetor;
    this.roteador = payload.roteador;
    this.bloqueado = payload.bloqueado;
    this.computadores = payload.computadores;
    this.capacidade = payload.capacidade;
    this.tomada_rede = payload.tomada_rede;
    this.tomada_energia = payload.tomada_energia;
  }

  @PrimaryColumn('uuid')
  @Generated('uuid')
  id!: string;

  @Column({ type:'text', nullable: false })
  nome!: string;

  @Column({ type:'text', nullable: false })
  bloco!: string;

  @Column({ type:'boolean', default: false })
  ar_condicionado!: boolean;

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
  tomada_rede: number;

  @Column({ type:'int', default: 0 })
  tomada_energia: number;
}
