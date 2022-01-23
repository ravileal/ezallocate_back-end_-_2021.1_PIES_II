import {MigrationInterface, QueryRunner} from "typeorm";

export class CriacaoDeTabelas1628432345784 implements MigrationInterface {
    name = 'CriacaoDeTabelas1628432345784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `sala` (`id` varchar(36) NOT NULL, `nome` text NOT NULL, `bloco` text NOT NULL, `ar_condicionado` tinyint NOT NULL DEFAULT 0, `projetor` tinyint NOT NULL DEFAULT 0, `roteador` tinyint NOT NULL DEFAULT 0, `bloqueado` tinyint NOT NULL DEFAULT 0, `computadores` int NOT NULL DEFAULT 0, `capacidade` int NOT NULL DEFAULT 0, `tomada_rede` int NOT NULL DEFAULT 0, `tomada_energia` int NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ocupacao` (`id` varchar(36) NOT NULL, `sala_id` varchar(255) NOT NULL, `descricao` text NOT NULL, `horario` text NOT NULL, `responsavel` text NOT NULL, `prof_responsavel` text NULL DEFAULT NULL, `dia_semana` text NOT NULL, `data_inicio` date NULL DEFAULT NULL, `data_fim` date NULL DEFAULT NULL, `recusa_motivo` text NULL DEFAULT NULL, `status` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `ocupacao` ADD CONSTRAINT `FK_4d4fe4e7958976876f49fcee3fb` FOREIGN KEY (`sala_id`) REFERENCES `sala`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ocupacao` DROP FOREIGN KEY `FK_4d4fe4e7958976876f49fcee3fb`");
        await queryRunner.query("DROP TABLE `ocupacao`");
        await queryRunner.query("DROP TABLE `sala`");
    }

}
