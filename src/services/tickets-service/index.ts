import httpStatus from 'http-status';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentsService from '@/services/enrollments-service';

async function getAllTypes() {
  const types = await ticketsRepository.findTypes();

  return types;
}

async function getTicketByUser(userId: number) {
  const enrollmentsExist = await enrollmentsService.getOneWithAddressByUserId(userId);

  if (!enrollmentsExist) throw httpStatus.NOT_FOUND;

  const ticket = await ticketsRepository.findTicketByEnrollment(enrollmentsExist.id);

  if (!ticket) throw httpStatus.NOT_FOUND;

  return ticket;
}

type Data = {
  ticketTypeId: number;
  userId: number;
};

async function createTicket(data: Data) {
  const enrollmentsExist = await enrollmentsService.getOneWithAddressByUserId(data.userId);

  if (!enrollmentsExist) throw httpStatus.NOT_FOUND;

  await ticketsRepository.createTickets({
    enrollmentId: enrollmentsExist.id,
    ticketTypeId: data.ticketTypeId,
    status: 'RESERVED',
  });

  const ticket = await ticketsRepository.findTicketByEnrollment(enrollmentsExist.id);

  return ticket;
}

const ticketsService = {
  getAllTypes,
  getTicketByUser,
  createTicket,
};

export default ticketsService;
