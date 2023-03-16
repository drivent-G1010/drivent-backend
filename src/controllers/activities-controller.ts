import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getDays(req: AuthenticatedRequest, res: Response) {
  //const { userId } = req;

  try {
    const days = await activitiesService.getDays();
    return res.status(httpStatus.OK).send(days);
  } catch (error) {
    console.log(error);
  }
}

export async function getActivitiesByDay() {}

export function selectActivities() {}
