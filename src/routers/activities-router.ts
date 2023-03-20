import { authenticateToken, validateParams } from "@/middlewares";
import { getActivitiesByDay, getDays, selectActivities } from "@/controllers";

import { Router } from "express";
import { getActivitiesDateSchema } from "@/schemas";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/days", getDays)
  .get("/:date", validateParams(getActivitiesDateSchema), getActivitiesByDay)
  .post("/", selectActivities);

export { activitiesRouter };
