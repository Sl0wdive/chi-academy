import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentTableCreatedAtAdd1771785092517 implements MigrationInterface {
    name = 'CommentTableCreatedAtAdd1771785092517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "createdAt"`);
    }

}
