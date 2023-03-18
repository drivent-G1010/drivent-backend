import { authenticateToken, validateBody } from "@/middlewares";
import { getActivitiesByDay, getDays, selectActivities } from "@/controllers";

import { Router } from "express";
import { getActivitiesDateSchema } from "@/schemas";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/days", getDays)
  .get("/", validateBody(getActivitiesDateSchema), getActivitiesByDay)
  .post("/", selectActivities);

export { activitiesRouter };
