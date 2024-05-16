import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMovieXGenre1715827443428 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.movie_x_genre (
            id serial4 NOT NULL,
            "movieId" uuid NOT NULL,
            "genreId" int4 NOT NULL,
            CONSTRAINT "PK_286edb11e29433b931ef96739d1" PRIMARY KEY (id),
            CONSTRAINT "FK_ec97a91d0551dabd5fd5c211a3a" FOREIGN KEY ("movieId") REFERENCES public.movie(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE public.movie_x_genre;');
  }
}
