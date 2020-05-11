import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ProcessRecord {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  status: string

  @CreateDateColumn()
  timestamp: Date
}
