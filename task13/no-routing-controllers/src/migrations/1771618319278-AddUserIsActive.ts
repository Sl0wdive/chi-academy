import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIsActive1771618319278 implements MigrationInterface {
    name = 'AddUserIsActive1771618319278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
    }

}
