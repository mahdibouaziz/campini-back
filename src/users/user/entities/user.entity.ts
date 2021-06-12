import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  // @Column()
  // salt: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  //bech tetbadel w tokhrej tableau wahadha
  @Column()
  rate: number;

  @BeforeInsert()
  async hashPaswword() {
    this.password = await bcrypt.hash(this.password, 'thisIsTheSalt');
  }
}
