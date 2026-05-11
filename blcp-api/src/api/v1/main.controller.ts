import { EntityTarget, ObjectLiteral } from "typeorm";
import { MainModel } from "../../database/main.model";
import HttpError, { asyncRouterHandler } from "../../helpers/express.helper";
import { ZodObject, ZodRawShape } from "zod";

export class MainController<T extends ObjectLiteral> extends MainModel<T> {
  schema: ZodObject<ZodRawShape> | undefined;
  constructor(repository: EntityTarget<T>, schema?: ZodObject<ZodRawShape>) {
    super(repository);
    this.schema = schema;
  }

  handleGetOne = asyncRouterHandler(async (req, res) => {
    const { id } = req.params;
    const record = await this.findById(id!.toString());

    if (!record) {
      throw new HttpError("Record not found", 404);
    }
    return res.json(record);
  });

  handleGetAll = asyncRouterHandler(async (req, res) => {
    const results = await this.findAll({});
    return res.json(results);
  });

  handleCreate = asyncRouterHandler(async (req, res) => {
    const payload = req.body;
    await this.schema?.parseAsync(payload);
    const record = await this.create(payload);
    return res.status(201).json(record);
  });

  handleUpdate = asyncRouterHandler(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    await this.schema?.partial().parseAsync(payload);
    const record = await this.update(id!.toString(), payload);
    return res.json(record);
  });
}
