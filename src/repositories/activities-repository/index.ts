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

const activitiesRepository = {
  findDays,
  findActivitiesByDay,
};

export default activitiesRepository;