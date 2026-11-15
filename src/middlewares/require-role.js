export const requireRole = (...allowedRoles) => {
    return(req, res, next) => {
        if(!req.user){
            return res.status(401).json({ error: { status: 401, message: 'Authentication required' } })
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({ error: { status: 403, message: 'Access denied' } })
        }
        next();
    }
}

