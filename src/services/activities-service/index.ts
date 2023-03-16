import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import activitiesRepository from "@/repositories/activities-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function listActivities(userId: number) {
  //Tem enrollment?
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListHotelsError(); //criar a função que pra atividades
  }
}
async function getDays(userId: number) {
  await listActivities(userId);

  const days = await activitiesRepository.findDays();
  return days;
}

async function getActivitiesByDay(userId: number, dayId: number) {
  await listActivities(userId);
  const activities = await activitiesRepository.findActivitiesByDay(dayId);

  if (!activities) {
    throw notFoundError();
  }

  return activities;
}

const activitiesService = {
  getDays,
  getActivitiesByDay,
};

export default activitiesService;
