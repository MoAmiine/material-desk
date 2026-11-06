import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const login = async (req, res, next) =>{
    const email = req.body.email
    const password = req.body.password
    const user  = await User.findOne({ email })
    if(!user){
        return res.status(401).json({error: {status: 401, message: 'invalid email or password'}})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return res.status(401).json({error: {status: 401, message: 'invalid email or password'}});
    }
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    )

    return res.status(200).json({token, role: user.role})
}