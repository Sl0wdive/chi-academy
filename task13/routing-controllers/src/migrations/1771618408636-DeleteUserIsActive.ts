import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteUserIsActive1771618408636 implements MigrationInterface {
    name = 'DeleteUserIsActive1771618408636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

}
