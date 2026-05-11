import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Application } from "./Application";
@Entity("application_documents")
export class ApplicationDocument {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  applicationId: string;

  @Column()
  type: string;

  @Column()
  url: string;

  @Column()
  originalFileName: string;

  @Column()
  mimeType: string;

  @Column({ type: "int" })
  fileSize: number;

  /*********RELATIONS********/
  @ManyToOne(() => Application, (application) => application.documents, {
    onDelete: "CASCADE",
  })
  application: Application;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
