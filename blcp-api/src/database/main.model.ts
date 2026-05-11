import {
  DataSource,
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
} from "typeorm";
import { AppDataSource } from "./config";
import HttpError from "../helpers/express.helper";

export class MainModel<T extends ObjectLiteral> {
  dataSource: DataSource;
  repository: EntityTarget<T>;

  constructor(repository: EntityTarget<T>) {
    this.dataSource = AppDataSource;
    this.repository = repository;
  }

  findById(id: string) {
    return this.dataSource
      .getRepository(this.repository)
      .findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }

  findOne(params: FindOptionsWhere<T>) {
    return this.dataSource.getRepository(this.repository).findOneBy(params);
  }

  async findAll(params: FindManyOptions<T>) {
    const [data, count] = await this.dataSource
      .getRepository(this.repository)
      .findAndCount(params);
    return { data, count };
  }

  async create(payload: DeepPartial<T>) {
    const entity = this.dataSource
      .getRepository(this.repository)
      .create(payload);
    return this.dataSource.getRepository(this.repository).save(entity);
  }

  async update(id: string, payload: DeepPartial<T>) {
    const record = await this.dataSource
      .getRepository(this.repository)
      .findOneBy({ id } as unknown as FindOptionsWhere<T>);

    if (!record) {
      throw new HttpError("Record not found", 404);
    }

    // ensure that the payload is merged with the existing record
    this.dataSource.getRepository(this.repository).merge(record, payload);

    return this.dataSource.getRepository(this.repository).save(record);
  }
}
