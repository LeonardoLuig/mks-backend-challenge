import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMovie1715827429060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.movie (
            id uuid DEFAULT uuid_generate_v4() NOT NULL,
            title varchar NOT NULL,
            description varchar NOT NULL,
            "cast" text NOT NULL,
            director text NOT NULL,
            "releaseYear" int4 NOT NULL,
            duration int4 NOT NULL,
            "createdAt" timestamp DEFAULT now() NOT NULL,
            "updatedAt" timestamp NULL,
            "removedAt" timestamp NULL,
            CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY (id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE public.movie;');
  }
}
