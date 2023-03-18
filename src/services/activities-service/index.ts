import { cannotListActivitiesError, notFoundError } from "@/errors";

import activitiesRepository from "@/repositories/activities-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function listActivities(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED") {
    throw cannotListActivitiesError();
  }
}
async function getDays(userId: number) {
  await listActivities(userId);

  const dates = await activitiesRepository.findDays();

  const days = [...new Set(dates.map((date) => date.startsAt.toISOString().split("T")[0]))];

  return days;
}

async function getActivitiesByDay(userId: number, date: string) {
  await listActivities(userId);
  const activitiesData = await activitiesRepository.findActivitiesByDay(date);
  const activities = activitiesData.map((activity) => {
    const { _count, ...rest } = activity;
    return {
      ...rest,
      remainingVacancies: activity.capacity - _count.BookingActivity,
    };
  });

  if (!activities) {
    throw notFoundError();
  }

  return activities;
}

async function selectActivity(userId: number, activityId: number) {
  return activitiesRepository.createBookingActivity(userId, activityId);
}

export type GetActivitiesDate = { date: string };

const activitiesService = {
  getDays,
  getActivitiesByDay,
  selectActivity,
};

export default activitiesService;
