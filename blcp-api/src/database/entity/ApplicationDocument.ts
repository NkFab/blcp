import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Application } from "./Application";

export enum DocumentType {
  // Application Level
  BUSINESS_PLAN = "BUSINESS_PLAN",
  RDB_REGISTRATION = "RDB_REGISTRATION",
  SOURCE_OF_FUNDS = "SOURCE_OF_FUNDS",
  FEE_PROOF = "FEE_PROOF",
  APPLICATION_FORM = "APPLICATION_FORM",
  INFO_SHEET = "INFO_SHEET",
  PAID_UP_CAPITAL_PROOF = "PAID_UP_CAPITAL_PROOF",
  CAPITAL_STRUCTURE = "CAPITAL_STRUCTURE",
  CERT_OF_INCORPORATION = "CERT_OF_INCORPORATION",
  MEMORANDUM_ARTICLES = "MEMORANDUM_ARTICLES",
  BOARD_RESOLUTION = "BOARD_RESOLUTION",

  // Foreign/Existing Conditional
  FOREIGN_NO_OBJECTION = "FOREIGN_NO_OBJECTION",
  FOREIGN_CONSOLIDATED_SUPERVISION = "FOREIGN_CONSOLIDATED_SUPERVISION",
  FOREIGN_MOU = "FOREIGN_MOU",
  AUDITED_FINANCIALS = "AUDITED_FINANCIALS",

  // Stakeholder Level
  CV = "CV",
  DEGREE_CERTIFICATE = "DEGREE_CERTIFICATE",
  POLICE_CLEARANCE = "POLICE_CLEARANCE",
  ID_PASSPORT = "ID_PASSPORT",
  TAX_COMPLIANCE = "TAX_COMPLIANCE",
  ASSETS_LIABILITIES_STATEMENT = "ASSETS_LIABILITIES_STATEMENT",
  PERSONAL_DECLARATION = "PERSONAL_DECLARATION",
  CREDIT_REFERENCE = "CREDIT_REFERENCE",
}

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
