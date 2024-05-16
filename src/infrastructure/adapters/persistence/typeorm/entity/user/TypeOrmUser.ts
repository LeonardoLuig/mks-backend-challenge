import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class TypeOrmUser {
  @PrimaryColumn({ name: 'id', type: 'uuid', primary: true })
  public id: string;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({ name: 'email', type: 'varchar', length: 100 })
  public email: string;

  @Column({ name: 'password', type: 'varchar', length: 200 })
  public password: string;

  @Column({ name: 'createdAt', type: 'timestamp without time zone', nullable: true })
  public createdAt: Date;

  @Column({ name: 'updatedAt', type: 'timestamp without time zone', nullable: true })
  public updatedAt: Date;

  @Column({ name: 'removedAt', type: 'timestamp without time zone', nullable: true })
  public removedAt: Date;
}
