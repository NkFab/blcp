import { EventEmitter } from "node:events";
import { Audit } from "../database/entity";
import { DeepPartial } from "typeorm";

type AppEvents = {
  "application:audit": [DeepPartial<Audit>];
};

export class AppEventEmitter extends EventEmitter {
  emit<T extends keyof AppEvents>(event: T, ...args: AppEvents[T]): boolean {
    return super.emit(event, ...args);
  }

  on<T extends keyof AppEvents>(
    event: T,
    listener: (...args: AppEvents[T]) => void,
  ): this {
    return super.on(event, (...args) => listener(...(args as AppEvents[T])));
  }
}

export const appEventEmitter = new AppEventEmitter();
