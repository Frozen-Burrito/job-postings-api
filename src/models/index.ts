import { model, Document } from "mongoose";

import * as models from "../../index";

import UserSchema from "./user";

export const UserModel = model<models.IUser & Document>("User", UserSchema);