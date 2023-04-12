import { Router } from 'express';
import { authenticateToken } from '@/middlewares';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken).get('/').get('/types').post('/');

export { ticketRouter };
