export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Erreur interne du server';

    if(statusCode === 500){
        console.error('erreur interne : ', err)
    }

    res.status(statusCode).json({
        error: {
            status: statusCode,
            message: statusCode === 500 ? 'Une erreur interne est survenue' : message
        }
    })
}