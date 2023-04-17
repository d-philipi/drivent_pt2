import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findTypes() {
  return prisma.ticketType.findMany();
}

async function findTypesById(id: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: id,
    },
  });
}

async function findTicketByEnrollment(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id: id,
    },
  });
}

async function createTickets(information: Prisma.TicketUncheckedCreateInput) {
  return prisma.ticket.create({
    data: {
      ...information,
    },
  });
}

const ticketsRepository = {
  findTypes,
  findTypesById,
  findTicketByEnrollment,
  findTicketById,
  createTickets,
};

export default ticketsRepository;
