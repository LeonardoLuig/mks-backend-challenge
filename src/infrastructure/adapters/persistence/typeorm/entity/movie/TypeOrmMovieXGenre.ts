import { TypeOrmMovie } from '@infrastructure/adapters/persistence/typeorm/entity/movie/TypeOrmMovie';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('movie_x_genre')
export class TypeOrmMovieXGenre {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'uuid' })
  public movieId: string;

  @Column({ type: 'integer' })
  public genreId: number;

  @ManyToOne(() => TypeOrmMovie, (typeOrmMovie) => typeOrmMovie.genres)
  @JoinColumn({ name: 'movieId' })
  public movie: TypeOrmMovie;
}
