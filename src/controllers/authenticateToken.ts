import jwt from 'jsonwebtoken';
import { secretJwt } from '../config/config';

export async function authenticateToken(token: string) {
  const result = jwt.verify(token, secretJwt, function (err, decoded) {
    if (err) {
      // console.log(`token invalid ${token}`);
      return false;
    } else {
      // console.log('token valid');
      return decoded;
    }
  });

  return result;
}
