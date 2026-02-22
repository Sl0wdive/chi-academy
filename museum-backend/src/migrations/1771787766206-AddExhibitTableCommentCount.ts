import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExhibitTableCommentCount1771787766206 implements MigrationInterface {
    name = 'AddExhibitTableCommentCount1771787766206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" ADD "commentCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP COLUMN "commentCount"`);
    }

}
