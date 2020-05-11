import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Server} from "./server.entity";

@Entity()
export class ProcessRecord {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Server, { eager: true })
  server: Server

  @Column()
  name: string

  @Column()
  status: string

  @CreateDateColumn()
  timestamp: Date
}
