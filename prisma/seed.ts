import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let ticketOnline = await prisma.ticketType.findFirst({
    where: {
      isRemote: true,
    },
  });
  if (!ticketOnline) {
    ticketOnline = await prisma.ticketType.create({
      data: {
        name: "online",
        price: 100,
        isRemote: true,
        includesHotel: false,
      },
    });
  }

  let ticketWithHotel = await prisma.ticketType.findFirst({
    where: {
      includesHotel: true,
    },
  });
  if (!ticketWithHotel) {
    ticketWithHotel = await prisma.ticketType.create({
      data: {
        name: "presencial",
        price: 600,
        isRemote: false,
        includesHotel: true,
      },
    });
  }

  let ticketWithoutHotel = await prisma.ticketType.findFirst({
    where: {
      isRemote: false,
      includesHotel: false,
    },
  });
  if (!ticketWithoutHotel) {
    ticketWithoutHotel = await prisma.ticketType.create({
      data: {
        name: "presencial",
        price: 250,
        isRemote: false,
        includesHotel: false,
      },
    });
  }

  let hotels = await prisma.hotel.findMany();
  if (hotels.length === 0) {
    await prisma.hotel.createMany({
      data: [
        {
          name: "Driven Resort",
          image:
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/370564672.jpg?k=4f37af06c05a6f5dfc7db5e8e71d2eb66cae6eec36af7a4a4cd7a25d65ceb941&o=&hp=1",
        },
        {
          name: "Driven Palace",
          image:
            "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/orlandofl/5900_pool_b92df465-0c67-4161-b8bb-67f9fc301094.jpg",
        },
        {
          name: "Driven World",
          image: "https://www.lux-review.com/wp-content/uploads/2019/09/turkish-hotel.jpg",
        },
      ],
    });
    hotels = await prisma.hotel.findMany();
  }

  let rooms = await prisma.room.findMany();
  if (rooms.length === 0) {
    await prisma.room.createMany({
      data: [
        {
          name: "101",
          capacity: 1,
          hotelId: 1,
        },
        {
          name: "102",
          capacity: 1,
          hotelId: 1,
        },
        {
          name: "103",
          capacity: 1,
          hotelId: 1,
        },
        {
          name: "104",
          capacity: 1,
          hotelId: 1,
        },
        {
          name: "105",
          capacity: 1,
          hotelId: 1,
        },
        {
          name: "106",
          capacity: 1,
          hotelId: 1,
        },
        {
          name: "101",
          capacity: 1,
          hotelId: 2,
        },
        {
          name: "102",
          capacity: 2,
          hotelId: 2,
        },
        {
          name: "103",
          capacity: 1,
          hotelId: 2,
        },
        {
          name: "104",
          capacity: 1,
          hotelId: 2,
        },
        {
          name: "105",
          capacity: 2,
          hotelId: 2,
        },
        {
          name: "106",
          capacity: 1,
          hotelId: 2,
        },
        {
          name: "101",
          capacity: 1,
          hotelId: 3,
        },
        {
          name: "102",
          capacity: 2,
          hotelId: 3,
        },
        {
          name: "103",
          capacity: 3,
          hotelId: 3,
        },
        {
          name: "104",
          capacity: 2,
          hotelId: 3,
        },
        {
          name: "105",
          capacity: 3,
          hotelId: 3,
        },
        {
          name: "106",
          capacity: 1,
          hotelId: 3,
        },
      ],
    });
    rooms = await prisma.room.findMany();
  }

  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "user@email.com",
        password: "$2b$12$rkzpIaPH3U8yPbLNXNQadeqcjQApF9aoHpiwtWidlV2jUEVFFe2xS",
      },
    });
  }

  const booking = await prisma.booking.findMany();
  if (booking.length === 0) {
    await prisma.booking.createMany({
      data: [
        {
          userId: user.id,
          roomId: 2,
        },
        {
          userId: user.id,
          roomId: 8,
        },
        {
          userId: user.id,
          roomId: 11,
        },
        {
          userId: user.id,
          roomId: 11,
        },
        {
          userId: user.id,
          roomId: 15,
        },
        {
          userId: user.id,
          roomId: 15,
        },
        {
          userId: user.id,
          roomId: 17,
        },
      ],
    });
  }

  const trails = await prisma.trail.findMany();
  if (trails.length === 0) {
    await prisma.trail.createMany({
      data: [
        {
          name: "Salão principal Vai malandra",
        },
        {
          name: "Sala de conferência Envolver",
        },
        {
          name: "Sala de reuniões Eu vou ficar, eu vou trair",
        },
      ],
    });
  }

  const activities = await prisma.activity.findMany();
  if (activities.length === 0) {
    await prisma.activity.createMany({
      data: [
        {
          name: "Workshop Quadradinho",
          capacity: 40,
          startsAt: dayjs("2023-04-30T08:00:00.000Z").toDate(),
          endsAt: dayjs("2023-04-30T08:00:00.000Z").add(1, "hour").toDate(),
          trailId: 1,
        },
        {
          name: "Mesa redonda do funk",
          capacity: 40,
          startsAt: dayjs("2023-04-30T08:00:00.000Z").toDate(),
          endsAt: dayjs("2023-04-30T08:00:00.000Z").add(1, "hour").toDate(),
          trailId: 2,
        },
        {
          name: "Reunião anitters",
          capacity: 40,
          startsAt: dayjs("2023-04-30T08:00:00.000Z").toDate(),
          endsAt: dayjs("2023-04-30T08:00:00.000Z").add(1, "hour").toDate(),
          trailId: 3,
        },
        {
          name: "Acabou a criatividade 1",
          capacity: 40,
          startsAt: dayjs("2023-04-30T10:00:00.000Z").toDate(),
          endsAt: dayjs("2023-04-30T10:00:00.000Z").add(1, "hour").toDate(),
          trailId: 1,
        },
        {
          name: "Acabou a criatividade 2",
          capacity: 40,
          startsAt: dayjs("2023-04-30T10:00:00.000Z").toDate(),
          endsAt: dayjs("2023-04-30T10:00:00.000Z").add(1, "hour").toDate(),
          trailId: 2,
        },
        {
          name: "Acabou a criatividade 3",
          capacity: 40,
          startsAt: dayjs("2023-04-30T10:00:00.000Z").toDate(),
          endsAt: dayjs("2023-04-30T10:00:00.000Z").add(1, "hour").toDate(),
          trailId: 3,
        },
        {
          name: "Workshop Quadradinho avançado",
          capacity: 40,
          startsAt: dayjs("2023-05-30T08:00:00.000Z").toDate(),
          endsAt: dayjs("2023-05-30T08:00:00.000Z").add(1, "hour").toDate(),
          trailId: 1,
        },
        {
          name: "Mesa redonda do funk 2",
          capacity: 40,
          startsAt: dayjs("2023-05-30T08:00:00.000Z").toDate(),
          endsAt: dayjs("2023-05-30T08:00:00.000Z").add(1, "hour").toDate(),
          trailId: 2,
        },
        {
          name: "Reunião anitters 2",
          capacity: 40,
          startsAt: dayjs("2023-05-30T08:00:00.000Z").toDate(),
          endsAt: dayjs("2023-05-30T08:00:00.000Z").add(1, "hour").toDate(),
          trailId: 3,
        },
        {
          name: "Acabou a criatividade 1",
          capacity: 40,
          startsAt: dayjs("2023-05-30T10:00:00.000Z").toDate(),
          endsAt: dayjs("2023-05-30T10:00:00.000Z").add(1, "hour").toDate(),
          trailId: 1,
        },
        {
          name: "Acabou a criatividade 2",
          capacity: 40,
          startsAt: dayjs("2023-05-30T10:00:00.000Z").toDate(),
          endsAt: dayjs("2023-05-30T10:00:00.000Z").add(1, "hour").toDate(),
          trailId: 2,
        },
        {
          name: "Acabou a criatividade 3",
          capacity: 40,
          startsAt: dayjs("2023-05-30T10:00:00.000Z").toDate(),
          endsAt: dayjs("2023-05-30T10:00:00.000Z").add(1, "hour").toDate(),
          trailId: 3,
        },
      ],
    });
  }
  //eslint-disable-next-line no-console
  console.log({ event, ticketOnline, ticketWithHotel, ticketWithoutHotel, hotels, rooms });
}

main()
  .catch((e) => {
    //eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
