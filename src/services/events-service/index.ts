import { notFoundError } from "@/errors";
import eventRepository from "@/repositories/event-repository";
import { exclude } from "@/utils/prisma-utils";
import { Event } from "@prisma/client";
import dayjs from "dayjs";
import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export const redis = createClient({ url: process.env.REDIS_URL });

redis.connect();

async function getFirstEvent(): Promise<GetFirstEventResult> {
  const cacheKey = "event";
  try {
    const cachedEvent = await redis.get(cacheKey);

    if (cachedEvent) {
      return JSON.parse(cachedEvent);
    } else {
      const event = await eventRepository.findFirst();
      if (!event) throw notFoundError();
      redis.set(cacheKey, JSON.stringify(exclude(event, "createdAt", "updatedAt")));

      return exclude(event, "createdAt", "updatedAt");
    }
  } catch (error) {
    console.log(error);
  }
}

export type GetFirstEventResult = Omit<Event, "createdAt" | "updatedAt">;

async function isCurrentEventActive(): Promise<boolean> {
  const event = await eventRepository.findFirst();
  if (!event) return false;

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}

const eventsService = {
  getFirstEvent,
  isCurrentEventActive,
};

export default eventsService;
