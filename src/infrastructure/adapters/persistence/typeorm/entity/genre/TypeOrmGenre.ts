import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('genre')
export class TypeOrmGenre {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  public name: string;
}
