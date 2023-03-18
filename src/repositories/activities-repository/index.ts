import { prisma } from "@/config";

async function findDays() {
  return prisma.activity.findMany({
    select: {
      startsAt: true,
    },
    distinct: ["startsAt"],
  });
}

async function findActivitiesByDay(date: string) {
  return prisma.activity.findMany({
    where: {
      startsAt: {
        gte: new Date(`${date}T00:00:00.000Z`),
        lt: new Date(`${date}T23:00:00.000Z`),
      },
    },
  });
}

async function createBookingActivity(userId: number, activityId: number) {
  return prisma.bookingActivity.create({
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
