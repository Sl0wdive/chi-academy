import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @Column({ type: "varchar" })
  user!: string;

  @Column({ unique: true })
  email!: string;
}