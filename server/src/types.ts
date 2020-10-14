import { Request, Response } from "express"

import { Redis } from "ioredis"
import { createUpdootLoader } from "./utils/createUpdootLoader"
import { createUserLoader } from "./utils/createUserLoader"

export type MyContext = {
  // undo req: Request & { session: Express.Session }
  req: Request & { session: any }
  redis: Redis
  res: Response
  userLoader: ReturnType<typeof createUserLoader>
  updootLoader: ReturnType<typeof createUpdootLoader>
}
