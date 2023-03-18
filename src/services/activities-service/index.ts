import activitiesRepository from "@/repositories/activities-repository";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";

async function listActivities(userId: number) {
  //Tem enrollment?
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED") {
    throw cannotListHotelsError(); //criar a função que pra atividades
  }
}
async function getDays(userId: number) {
  await listActivities(userId);

  const dates = await activitiesRepository.findDays();

  const days = [...new Set(dates.map((d) => d.startsAt.toISOString().split("T")[0]))];

  return days;
}

async function getActivitiesByDay(userId: number, date: string) {
  await listActivities(userId);
  const activities = await activitiesRepository.findActivitiesByDay(date);

  if (!activities) {
    throw notFoundError();
  }

  return activities;
}

async function selectActivity(userId: number, activityId: number) {
  return activitiesRepository.createBookingActivity(userId, activityId);
}

const activitiesService = {
  getDays,
  getActivitiesByDay,
  selectActivity,
};

export default activitiesService;
