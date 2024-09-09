/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import { validationResult } from 'express-validator';
import UserNotFound from '../errors/UserNotFound.js';
import ValidationError from '../errors/ValidationError.js';
import UserServices from '../services/User.js';

const { SECRET } = process.env;

const getPasswordHash = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
class UserController {
  static signIn = async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

      const { email, password } = req.body;

      const user = await UserServices.getByEmail({ email });

      if (!user) return next(new ValidationError('Invalid User or Password'));

      if (bcrypt.compareSync(password, user.password)) {
        const payload = {
          id: user.id,
          email: user.email,
        };
        const token = jwt.encode(payload, SECRET);
        return res.status(200).json({ token });
      } return next(new ValidationError('Invalid User or Password'));
    } catch (err) {
      return console.log(`Error: ${err}`);
    }
  };

  static signUp = async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

      const { email, password } = req.body;

      const userExists = await UserServices.getByEmail(email);
      if (userExists) return next(new ValidationError('There is already a user with this email'));

      const passwordEncrypted = getPasswordHash(password);

      const newUser = { email, password: passwordEncrypted };

      return UserServices.create(newUser)
        .then(user => res.status(201).json({ User: user }))
        .catch(err => next(err));
    } catch (err) {
      return console.log(`Error: ${err}`);
    }
  };

  static getUserById = async userId => {
    try {
      const user = UserServices.getUserById(userId);
      if (!user) throw new UserNotFound('User not found');
      return user;
    } catch (err) {
      return err;
    }
  };

  static getAllUsers = async (req, res, next) => {
    try {
      const users = await UserServices.getAll();
      if (users.length === 0 || !users) return next(new UserNotFound('No user registration'));
      return res.status(200).json({ users });
    } catch (err) {
      return next(err);
    }
  };
}

export default UserController;
