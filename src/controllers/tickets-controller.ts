import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTicketsTypes(req: Request, res: Response) {
  try {
    const ticketsTypes = await ticketsService.getAllTypes();

    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticket = await ticketsService.getTicketByUser(userId);

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {
  if (!req.userId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const result = await ticketsService.createTicket({
      ...req.body,
      userId: req.userId,
    });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
