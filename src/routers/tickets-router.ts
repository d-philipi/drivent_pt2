import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTickets, getTicketsTypes, postTickets } from '@/controllers/tickets-controller';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken).get('/types', getTicketsTypes).get('/', getTickets).post('/', postTickets);

export { ticketRouter };
