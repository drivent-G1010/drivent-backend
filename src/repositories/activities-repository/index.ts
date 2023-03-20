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
  return prisma.trail.findMany({
    include: {
      Activity: {
        where: {
          startsAt: {
            gte: new Date(`${date}T00:00:00.000Z`),
            lt: new Date(`${date}T23:59:00.000Z`),
          },
        },
        include: {
          _count: {
            select: { BookingActivity: true },
          },
        },
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

async function getBookedActivitiesByUser(userId: number) {
  return prisma.bookingActivity.findMany({
    where: { userId },
  });
}

const activitiesRepository = {
  findDays,
  findActivitiesByDay,
  createBookingActivity,
  getBookedActivitiesByUser,
};

export default activitiesRepository;
