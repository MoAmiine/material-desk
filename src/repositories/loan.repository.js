import { Loan } from '../models/loan.model.js';

export const findReturnedLoans = async (fromDate) => {
  const loans = await Loan.find({
    status: 'returned',
    returnedAt: { $gte: fromDate }
  })
    .populate('equipmentId')
    .sort({ returnedAt: -1, _id: 1 })
    .lean();

  return loans.map((loan) => ({
    ...loan,
    equipment: loan.equipmentId || null
  }));
};
