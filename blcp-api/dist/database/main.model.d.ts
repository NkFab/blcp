import { DataSource, DeepPartial, EntityTarget, FindManyOptions, FindOptionsWhere, ObjectLiteral } from "typeorm";
export declare class MainModel<T extends ObjectLiteral> {
    dataSource: DataSource;
    repository: EntityTarget<T>;
    constructor(repository: EntityTarget<T>);
    findById(id: string): Promise<T | null>;
    findOne(params: FindOptionsWhere<T>): Promise<T | null>;
    findAll(params: FindManyOptions<T>): Promise<{
        data: T[];
        count: number;
    }>;
    create(payload: DeepPartial<T>): Promise<T>;
    update(id: string, payload: DeepPartial<T>): Promise<T>;
}
//# sourceMappingURL=main.model.d.ts.map