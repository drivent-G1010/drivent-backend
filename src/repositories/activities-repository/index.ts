import { prisma } from "@/config";

async function findDays() {
  return prisma.days.findMany();
}

async function findActivitiesByDay(dayId: number) {
  return prisma.activities.findMany({
    where: {
      dayId,
    },
  });
}

async function createBookingActivity(userId: number, activityId: number) {
  return prisma.bookingActivities.create({
    data: {
      userId,
      activityId,
    },
  });
}

const activitiesRepository = {
  findDays,
  findActivitiesByDay,
  createBookingActivity,
};

export default activitiesRepository;
