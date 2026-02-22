import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCommentsTable1771784454045 implements MigrationInterface {
    name = 'AddCommentsTable1771784454045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "exhibitId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c3ccea5d3778b018c3ba010d96c" FOREIGN KEY ("exhibitId") REFERENCES "exhibit"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c3ccea5d3778b018c3ba010d96c"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
