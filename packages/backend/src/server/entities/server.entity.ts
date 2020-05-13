import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Server {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ip: string;
}
