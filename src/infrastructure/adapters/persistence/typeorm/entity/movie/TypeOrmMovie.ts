import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('movie')
export class TypeOrmMovie {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar' })
  public title: string;

  @Column({ type: 'varchar' })
  public description: string;

  @Column({ type: 'text' })
  public cast: string;

  @Column({ type: 'text' })
  public director: string;

  @Column({ type: 'integer' })
  public releaseYear: number;

  @Column({ type: 'integer' })
  public duration: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public removedAt: Date;

  public genres: { id: number; name: string }[];
}
