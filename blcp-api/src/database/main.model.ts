/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import {
  DataSource,
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
} from "typeorm";
import { AppDataSource } from "./config";
import HttpError from "../helpers/express.helper";

export type MainModalCallbacks<T> = {
  beforeCreate?: (data: T) => void;
  beforeUpdate?: (beforeData: T, afterData: T) => void;
};

export class MainModel<T extends ObjectLiteral> {
  dataSource: DataSource;
  repository: EntityTarget<T>;

  callbacks: MainModalCallbacks<T> | undefined;

  constructor(repository: EntityTarget<T>, callbacks?: MainModalCallbacks<T>) {
    this.dataSource = AppDataSource;
    this.repository = repository;
    this.callbacks = callbacks;
  }

  findById(id: string) {
    return this.dataSource
      .getRepository(this.repository)
      .findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }

  findOne(params: FindOneOptions<T>) {
    return this.dataSource.getRepository(this.repository).findOne(params);
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
    const data = await this.dataSource
      .getRepository(this.repository)
      .save(entity);

    this.callbacks?.beforeCreate?.(data);

    return data;
  }

  async update(id: string, payload: DeepPartial<T> & { version?: number }) {
    const repo = this.dataSource.getRepository(this.repository);
    const findOptions: FindOneOptions<T> = {
      where: { id } as unknown as FindOptionsWhere<T>,
    };
    if ((payload as unknown as Record<string, unknown>).version) {
      findOptions["lock"] = {
        mode: "optimistic",
        version: payload.version!,
      };
    }
    const record = await repo.findOne(findOptions);

    if (!record) {
      throw new HttpError("Record not found", 404);
    }

    const beforeData = { ...record } as T;
    repo.merge(record, payload);
    await this.callbacks?.beforeUpdate?.(beforeData, record);
    return repo.save(record);
  }
}
