import { z } from 'zod';

const updateEquipmentSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    dailyLateFeeCents: z.number().int().nonnegative().optional()
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Au moins un champ (name ou dailyLateFeeCents) doit être fourni'
  });

export const validateUpdateEquipment = (req, res, next) => {
  const result = updateEquipmentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: {
        status: 400,
        message: 'Données invalides',
        details: result.error.issues
      }
    });
  }

  req.validatedBody = result.data;
  next();
};
