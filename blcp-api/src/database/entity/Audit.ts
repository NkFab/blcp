import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Application } from "./Application";
import { User } from "./User";

export enum AuditAction {
  CREATE_APPLICATION = "CREATE_APPLICATION",
  UPDATE_APPLICATION = "UPDATE_APPLICATION",
  SUBMIT_APPLICATION = "SUBMIT_APPLICATION",
  REVIEW_APPLICATION = "REVIEW_APPLICATION",
  APPROVE_APPLICATION = "APPROVE_APPLICATION",
  REJECT_APPLICATION = "REJECT_APPLICATION",
  EDIT_APPLICATION = "EDIT_APPLICATION",
  UPLOAD_DOCUMENT = "UPLOAD_DOCUMENT",
}

@Entity("audits")
export class Audit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.audits, {
    nullable: true,
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  applicationId: string;

  @ManyToOne(() => Application, (application) => application.audits, {
    nullable: true,
  })
  @JoinColumn({ name: "applicationId" })
  application: Application | null;

  @Column()
  action: string;

  @Column({ type: "jsonb", nullable: false })
  snapshot: {
    before: Application | null;
    after: Application | null;
  };

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
