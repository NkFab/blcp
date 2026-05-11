"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModel = void 0;
const config_1 = require("./config");
const express_helper_1 = __importDefault(require("../helpers/express.helper"));
class MainModel {
    dataSource;
    repository;
    constructor(repository) {
        this.dataSource = config_1.AppDataSource;
        this.repository = repository;
    }
    findById(id) {
        return this.dataSource
            .getRepository(this.repository)
            .findOneBy({ id });
    }
    findOne(params) {
        return this.dataSource.getRepository(this.repository).findOneBy(params);
    }
    async findAll(params) {
        const [data, count] = await this.dataSource
            .getRepository(this.repository)
            .findAndCount(params);
        return { data, count };
    }
    async create(payload) {
        const entity = this.dataSource
            .getRepository(this.repository)
            .create(payload);
        return this.dataSource.getRepository(this.repository).save(entity);
    }
    async update(id, payload) {
        const record = await this.dataSource
            .getRepository(this.repository)
            .findOneBy({ id });
        if (!record) {
            throw new express_helper_1.default("Record not found", 404);
        }
        // ensure that the payload is merged with the existing record
        this.dataSource.getRepository(this.repository).merge(record, payload);
        return this.dataSource.getRepository(this.repository).save(record);
    }
}
exports.MainModel = MainModel;
//# sourceMappingURL=main.model.js.map