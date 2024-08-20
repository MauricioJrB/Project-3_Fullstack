import UserNotFound from '../errors/UserNotFound.js';
import ValidationError from '../errors/ValidationError.js';
import UserServices from '../services/User.js';

class UserController {
  static create = async (req, res, next) => {
    const { email, password } = req.body;

    const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

    if (!regexEmail.test(email)) return next(new ValidationError('Invalid email adress'));
    if (!password || password.length < 6) return next(new ValidationError('Insert a valid password'));

    const userExists = await UserServices.getByEmail({ email });
    if (userExists) return next(new ValidationError('There is already a user with this email'));

    const newUser = { email, password };

    return UserServices.create(newUser)
      .then(user => res.status(201).json({ User: user }))
      .catch(err => next(err));
  };

  static getUserById = async (req, res, next) => {
    const userId = req.params.id;

    return UserServices.getUserById(userId)
      .then(user => {
        if (!user) return next(new UserNotFound('User not found'));
        return res.status(200).json({ user });
      })
      .catch(err => next(err));
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
