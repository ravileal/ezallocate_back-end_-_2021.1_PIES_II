

DROP SCHEMA IF EXISTS ezallocate;
CREATE SCHEMA IF NOT EXISTS ezallocate;


CREATE TABLE IF NOT EXISTS ezallocate.sala (
  id VARCHAR(50) NOT NULL,
  nome VARCHAR(50) NOT NULL,
  bloco VARCHAR(50) NOT NULL,
  arCondicionado BOOLEAN DEFAULT FALSE,
  projetor BOOLEAN DEFAULT FALSE,
  roteador BOOLEAN DEFAULT FALSE,
  bloqueado BOOLEAN DEFAULT FALSE,
  computadores INT DEFAULT 0,
  capacidade INT DEFAULT 0,
  tomadaRede INT DEFAULT 0,
  tomadaEnergia INT DEFAULT 0,
  PRIMARY KEY (id)
);

