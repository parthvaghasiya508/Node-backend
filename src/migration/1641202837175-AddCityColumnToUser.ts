import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCityColumnToUser1641202837175 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `city` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
