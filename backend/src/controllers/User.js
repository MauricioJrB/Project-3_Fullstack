import UserServices from '../services/User.js';

class UserController {
  static create = (req, res, next) => {
    const { email, password } = req.body;

    const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

    if (!email) return res.status(422).json({ msg: 'Insert password' });
    if (!regexEmail.test(email)) return res.status(422).json({ msg: 'Invalid email adress' });
    if (!password) return res.status(422).json({ msg: 'Insert password' });

    const newUser = { email, password };

    return UserServices.create(newUser)
      .then(res.status(201).json({ User: newUser }))
      .catch(err => next(err));
  };

  static getUserById = async (req, res, next) => {
    try {
      const user = await UserServices.getById(req.params.id);
      if (!user) return res.status(404).json({ msg: 'User not found' });
      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  };

  static getAllUsers = async (req, res, next) => {
    try {
      const users = await UserServices.getAll();
      if (users.length === 0 || !users) return res.status(404).json({ msg: 'No user registration' });
      return res.status(200).json({ users });
    } catch (err) {
      return next(err);
    }
  };
}

export default UserController;
