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
  mode: string

  @Column()
  status: string

  @CreateDateColumn()
  timestamp: Date

  @Column()
  instances: number

  @Column()
  runningFor: number

  @Column()
  restart: number

  @Column()
  cpu: number

  @Column()
  memory: number

  @Column({ nullable: true })
  httpMeanLatency: number | null

  @Column({ nullable: true })
  requestsPerMinute: number | null


}
