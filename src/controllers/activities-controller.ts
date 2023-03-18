import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import activitiesService from "@/services/activities-service";
import httpStatus from "http-status";

export async function getDays(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const days = await activitiesService.getDays(Number(userId));
    return res.status(httpStatus.OK).send(days);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "cannotListHotelsError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getActivitiesByDay(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const date: string = req.body.date;

  try {
    const activities = await activitiesService.getActivitiesByDay(Number(userId), date);

    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "cannotListActivitiesError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function selectActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { activityId } = req.body;

    if (!activityId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const bookingActivity = await activitiesService.selectActivity(userId, Number(activityId));

    return res.status(httpStatus.OK).send({
      bookingActivityId: bookingActivity.id,
    });
  } catch (error) {
    if (error.name === "CannotBookingError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
