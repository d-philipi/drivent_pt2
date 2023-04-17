import httpStatus from 'http-status';
import enrollmentsService from '../enrollments-service';
import ticketsRepository from '@/repositories/tickets-repository';
import paymentRepository from '@/repositories/payments-repository';
import { notFoundError } from '@/errors';

type Data = {
  id: number;
  userId: number;
};

async function getPaymentByTicketId(data: Data) {
  const ticket = await ticketsRepository.findTicketById(data.id);

  if (!ticket) throw httpStatus.NOT_FOUND;

  const enrollmentsExist = await enrollmentsService.getOneWithAddressByUserId(data.userId);

  if (enrollmentsExist.id !== ticket.enrollmentId) throw httpStatus.UNAUTHORIZED;

  const payment = await paymentRepository.getUserPayment(data.id);

  if (!payment) throw notFoundError;

  return payment;
}

export type Information = {
  userId: number;
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

async function createPayment(data: Information) {
  const ticket = await ticketsRepository.findTicketById(data.ticketId);

  if (!ticket) throw httpStatus.NOT_FOUND;

  const ticketType = await ticketsRepository.findTypesById(ticket.ticketTypeId);

  const enrollmentsExist = await enrollmentsService.getOneWithAddressByUserId(data.userId);

  if (enrollmentsExist.id !== ticket.enrollmentId) throw httpStatus.UNAUTHORIZED;

  await paymentRepository.createPayment({
    ticketId: data.ticketId,
    value: ticketType.price,
    cardIssuer: data.cardData.issuer,
    cardLastDigits: String(data.cardData.number),
  });

  const result = paymentRepository.getUserPayment(data.ticketId);

  return result;
}

const paymentServices = {
  getPaymentByTicketId,
  createPayment,
};

export default paymentServices;
