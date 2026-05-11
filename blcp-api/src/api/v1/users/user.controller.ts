import { User } from "../../../database/entity/User";
import { MainController } from "../main.controller";

export default new MainController<User>(User);
