import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import bcrypt from "bcryptjs";
import { Token } from "./Token";
import { Application } from "./Application";
import { Audit } from "./Audit";

export enum UserRole {
  APPLICANT = "applicant",
  REVIEWER = "reviewer",
  APPROVER = "approver",
  SUPERVISOR = "supervisor",
  ADMIN = "admin",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.APPLICANT,
  })
  role: UserRole;

  @Column({ select: false })
  password: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @OneToMany(() => Application, (application) => application.reviewer)
  assignedApplications: Application[];

  @OneToMany(() => Application, (application) => application.applicant)
  applications: Application[];

  @OneToMany(() => Application, (application) => application.approver)
  approvedApplications: Application[];

  @OneToMany(() => Audit, (audit) => audit.user)
  audits: Audit[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  /************************************/
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
