import { Equipment } from '../models/equipment.model.js'


export const findAll = async (filter) => {
    const equipments = await Equipment.find(filter);
    return equipments;
}

export const count = async (filter) => {
    const countEquipments = await Equipment.countDocuments(filter)
    return countEquipments;
}

export const findById = async (id) => {
    const equipment = await Equipment.findById(id);
    return equipment;
}

export const create = async (data) => {
    const equipment = await Equipment.create(data)
    return equipment;
}

export const update = async (id, data) => {
  return await Equipment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export const incrementCheckout = async (id) => {
  return await Equipment.findByIdAndUpdate(
    id,
    { $inc: { checkoutCount: 1 } },
    { new: true }
  );
}