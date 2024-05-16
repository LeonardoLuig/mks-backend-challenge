import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableGenre1715827392781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.genre (
        id serial4 NOT NULL,
        "name" varchar(50) NOT NULL,
        CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE public.genre;');
  }
}
