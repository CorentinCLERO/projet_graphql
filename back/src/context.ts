import { PrismaClient } from "@prisma/client";
import { AuthenticatedUser } from "./modules/auth.js";

export type DataSourceContext = {
  dataSources: {
    db: PrismaClient
  };
  user: AuthenticatedUser
};