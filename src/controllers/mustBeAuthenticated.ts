import jwt from 'jsonwebtoken';
import { secretJwt } from '../config/config';

export async function authenticate(token: string) {
  jwt.verify(token, secretJwt, function (err, decoded) {
    if (err) {
      console.log(`token invalid ${token}`);
      return;
    } else {
      console.log('token valid');
    }
  });
}
