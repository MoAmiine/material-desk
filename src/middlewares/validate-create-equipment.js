import z from 'zod';

const schema = z.object({
    assetTag: z.string().trim().min(1).transform(val => val.toUpperCase()),
    name: z.string().trim().min(1),
    category: z.enum(['video', 'audio', 'informatique']),
    dailyLateFeeCents: z.number().int().nonnegative()
}).strict()

export const createValidation = (req, res, next) => {
    const result = schema.safeParse(req.body)
    if(result.success === false){
        return res.status(400).json({error: {status: 400, message: 'Données invalides', details: result.error.issues}})
    }
    req.validatedBody = result.data
    next();
}