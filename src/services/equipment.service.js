import mongoose from 'mongoose';
import * as equipmentRepo from '../repositories/equipment.repository.js';


const createError = (status, message) => {
    const error  = new Error(message);
    error.status = status;
    return error;
}

export const getEquipments = async (category) =>{
    const filter = { isArchived: false }

    if(category !== undefined){
        if(category.trim() === ''){
            throw createError(400, 'Category is empty')
        }
        filter.category = category

    }
    return await equipmentRepo.findAll(filter);
}

export const getStats = async () => {
    const count = await equipmentRepo.count({ isArchived: false });
    return { count }
}

export const getEquipmentById = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw createError(400, 'invalid id');
    }
    const equipment = await equipmentRepo.findById(id)
    if(!equipment){
        throw createError(404, 'Equipment not found');
    }
    if(equipment.isArchived){
        throw createError(404, 'equipment Archived');
    }
    return equipment
}

