import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentServices from '@/services/payments-service';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query;

  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentServices.getPaymentByTicketId({
      id: Number(ticketId),
      userId,
    });

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId, cardData } = req.body;

  if (!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentServices.createPayment({
      userId,
      ticketId,
      cardData,
    });

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
