import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(!token) {
            return res.status(401).json({ message : 'No token, authorization denied'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const admin = await Admin.findById(decoded.id);

        if(!admin) {
            return res.status(401).json({ message: 'Token is not valid'});
        }
        req.admin = admin;
        next();
    } catch(error) {
        res.status(401).json({ message: 'Token is not valid'})
    }
}

export default auth;