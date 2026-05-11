import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { ApplicationDocument } from "./ApplicationDocument";

export enum ApplicationStatus {
  DRAFT = "draft",
  SUBMITTED = "submitted",
  UNDER_REVIEW = "under_review",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum InstitutionType {
  COMMERCIAL = "commercial_bank", // 20B in capital
  DEVELOPMENT = "development_bank", // 50B in capital
  COOPERATIVE = "cooperative_bank", // 10B in capital
  MORTGAGE = "mortgage_bank", // 10B
}

export enum LicenceType {
  COMMERCIAL = "commercial_licence",
  DEVELOPMENT = "development_bank_licence",
  MICROFINANCE = "microfinance_bank_licence",
}

@Entity("applications")
export class Application {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  referenceNumber: string;

  @Column()
  institutionName: string;

  @Column({
    type: "enum",
    enum: InstitutionType,
  })
  institutionType: InstitutionType;

  @Column({ type: "decimal", precision: 20, scale: 2 })
  capitalAmount: number;

  @Column({
    type: "enum",
    enum: LicenceType,
  })
  licenceType: LicenceType;

  @Column({
    type: "enum",
    enum: ApplicationStatus,
    default: ApplicationStatus.DRAFT,
  })
  status: ApplicationStatus;

  @Column({ default: false })
  isForeignApplicant: boolean;

  @Column({ default: false })
  isExistingInstitution: boolean;

  /**********TIMESTAMPS and association**************/
  @Column({ type: "uuid" })
  applicantId: string;

  @ManyToOne(() => User, (user) => user.applications, { nullable: false })
  @JoinColumn({ name: "applicantId" })
  applicant: User;

  @Column({ type: "uuid", nullable: true })
  reviewedById: string;

  @ManyToOne(() => User, (user) => user.assignedApplications, {
    nullable: true,
  })
  @JoinColumn({ name: "reviewedById" })
  reviewedBy: User | null;

  @OneToMany(() => ApplicationDocument, (document) => document.application, {
    cascade: true,
  })
  documents: ApplicationDocument[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  submittedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  reviewedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  reviewCompletedAt: Date;
}
