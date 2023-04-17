import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getUserPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      id: ticketId,
    },
  });
}

async function createPayment(payment: Prisma.PaymentUncheckedCreateInput) {
  return prisma.payment.create({
    data: {
      ...payment,
    },
  });
}

const paymentRepository = {
  getUserPayment,
  createPayment,
};

export default paymentRepository;
