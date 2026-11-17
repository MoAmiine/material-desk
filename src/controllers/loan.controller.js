import * as loanService from '../services/loan.service.js';

export const getReturnedLoans = async (req, res, next) => {
  try {
    const result = await loanService.getReturnedLoans(req.query.from);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};