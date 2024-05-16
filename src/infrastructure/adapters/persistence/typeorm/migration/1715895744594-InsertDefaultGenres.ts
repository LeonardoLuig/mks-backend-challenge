import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultGenres1715895744594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO
            public.genre("name")
        VALUES
            ('Ação'),
            ('Aventura'),
            ('Comédia'),
            ('Drama'),
            ('Romance'),
            ('Documentário'),
            ('Espionagem'),
            ('Ocidental'),
            ('Fantasia'),
            ('Ficção científica'),
            ('Guerra'),
            ('Mistério'),
            ('Musical'),
            ('Crime'),
            ('Terror'),
            ('Suspense');

    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
