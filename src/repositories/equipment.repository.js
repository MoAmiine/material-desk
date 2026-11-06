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