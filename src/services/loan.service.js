import * as loanRepo from '../repositories/loan.repository.js';

const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const getReturnedLoans = async (from) => {
  if (!from || from.trim() === '') {
    throw createError(400, 'Le paramètre from est requis');
  }

  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
  if (!isoRegex.test(from) || isNaN(Date.parse(from))) {
    throw createError(400, 'Le format de date doit être ISO valide avec fuseau');
  }

  const fromDate = new Date(from);
  return await loanRepo.findReturnedLoans(fromDate);
};
