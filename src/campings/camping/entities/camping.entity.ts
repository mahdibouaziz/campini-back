import { User } from 'src/users/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Camping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  place: string;

  @Column()
  date: Date;

  @Column()
  numnberOfDays: number; //9adeh men nhar

  @Column()
  numberMaxOfParticipants: number;

  @Column()
  numberOfParticipants: number;

  @Column()
  image: string;

  @Column()
  price: number;

  @ManyToOne(() => User)
  organiser: User;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];
}
