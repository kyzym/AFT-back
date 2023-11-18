import jwt from 'jsonwebtoken';
import { UnAuthorizedError, NotFoundError } from '../helpers/errors.js';
import { getRoleData } from '../helpers/getRoleData.js';

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnAuthorizedError();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const { id, role } = decoded;

    const roleData = await getRoleData(role, id);
    if (!roleData) {
      throw new NotFoundError(`${role} with id ${id} not found`);
    }

    req.id = roleData._id;
    next();
  } catch (error) {
    console.error(`Token verification error: ${error.message}`);
    return res
      .status(error.code || 401)
      .send({ message: error.message || 'Invalid token' });
  }
};

export default verifyToken;
