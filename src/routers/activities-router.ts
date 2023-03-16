import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getDays, getActivitiesByDay, selectActivities } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/", getDays)
  .get("/:dayId", getActivitiesByDay)
  .post("/", selectActivities);

export { activitiesRouter };
