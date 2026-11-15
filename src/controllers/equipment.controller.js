import * as equipmentService from '../services/equipment.service.js';


export const list = async (req, res, next) => {
    try{
        const category = req.query.category
        const result = await equipmentService.getEquipments(category);
        res.status(200).json(result)
    }catch(error){
        next(error)
    }
}

export const stats = async (req, res, next) => {
    try{
    const result = await equipmentService.getStats();
    res.status(200).json(result)
}catch(error){
    next(error);
}
}

export const getById = async (req, res, next) => {
    try{
    const id = req.params.id
    const result = await equipmentService.getEquipmentById(id)
    res.status(200).json(result)
    }catch(error){
        next(error)
    }
}