import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1715827454651 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public."user" (
            id uuid NOT NULL,
            "name" varchar(100) NOT NULL,
            email varchar(100) NOT NULL,
            "password" varchar(200) NOT NULL,
            "createdAt" timestamp NULL,
            "updatedAt" timestamp NULL,
            "removedAt" timestamp NULL,
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE public."user";');
  }
}
